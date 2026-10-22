import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import ConversionCTA from "../components/ConversionCTA";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "promotion-letter-generator";

const FAQS = [
  {
    q: "What is a promotion letter?",
    a: "A promotion letter is a formal letter from an employer informing an employee that they have been elevated to a higher designation, usually with revised responsibilities and compensation. It records the new role, the effective date, and any change in salary or reporting structure.",
  },
  {
    q: "What should a promotion letter include?",
    a: "It should include the employee's name and current designation, the new designation, the effective date, the revised salary or CTC (if applicable), the new reporting manager or department, and the signature of the HR manager or authorised signatory on company letterhead.",
  },
  {
    q: "Is a promotion letter different from an increment letter?",
    a: "Yes. A promotion letter changes the employee's designation and responsibilities, and often includes a salary revision. An increment letter only revises the salary without changing the role. Companies sometimes combine the two when a promotion comes with a raise.",
  },
  {
    q: "Is a promotion letter legally binding in India?",
    a: "Yes, once issued and accepted, a promotion letter becomes part of the employment record and amends the terms of the original appointment letter. Employees often need it for background verification, loan applications, and visa processing.",
  },
  {
    q: "Should a promotion letter mention a probation period?",
    a: "Some companies place promoted employees on a short review period in the new role. If so, the letter should state the duration and what happens on successful or unsuccessful completion. This is optional and depends on company policy.",
  },
  {
    q: "Is this promotion letter generator free?",
    a: "Yes, this generator is 100% free with no login required. The letter is generated entirely in your browser and can be downloaded as a PDF instantly.",
  },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(iso) {
  if (!iso) return "___";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function fmtAmount(v) {
  const n = Number(v);
  if (!v || Number.isNaN(n)) return "";
  return "Rs. " + n.toLocaleString("en-IN");
}

export default function PromotionLetterGenerator() {
  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    hrName: "",
    hrDesignation: "HR Manager",
    issueDate: todayStr(),
    referenceNo: "",
    employeeName: "",
    currentDesignation: "",
    newDesignation: "",
    empId: "",
    department: "",
    reportingTo: "",
    newSalary: "",
    salaryBasis: "per annum (CTC)",
    effectiveDate: todayStr(),
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const salaryClause = form.newSalary
    ? ` Your revised compensation will be ${fmtAmount(form.newSalary)} ${form.salaryBasis}.`
    : "";
  const reportingClause = form.reportingTo
    ? ` In your new role, you will report to ${form.reportingTo}.`
    : "";

  const bodyText = `We are pleased to inform you that, in recognition of your consistent performance and contribution, you have been promoted from ${form.currentDesignation || "________"} to ${form.newDesignation || "________"}${form.department ? ` in the ${form.department} department` : ""}, effective ${fmtDate(form.effectiveDate)}.${salaryClause}${reportingClause}`;

  const handleDownload = () => {
    createPdf({
      title: "PROMOTION LETTER",
      filename: `promotion-letter-${form.issueDate || "undated"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form, bodyText),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just created a promotion letter using DoAide Docs -- completely free and no login needed. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Promotion Letter Generator Online | DoAide Docs"
        description="Generate a professional employee promotion letter online for free. Record the new designation, salary revision, and effective date. Download as PDF instantly. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Promotion Letter</span> Generator</h1>
          <p>Create a professional promotion letter with the new designation, salary revision, and effective date. Preview live and download as PDF. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Company Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Company Name *</label>
                <input value={form.companyName} onChange={set("companyName")} placeholder="e.g. Acme Technologies Pvt Ltd" />
              </div>
              <div className="form-group">
                <label>Issue Date *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Company Address</label>
                <input value={form.companyAddress} onChange={set("companyAddress")} placeholder="City, State (optional)" />
              </div>
              <div className="form-group">
                <label>Reference No</label>
                <input value={form.referenceNo} onChange={set("referenceNo")} placeholder="e.g. HR/PROM/2026/001 (optional)" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>HR / Signatory Name *</label>
                <input value={form.hrName} onChange={set("hrName")} placeholder="Name of the person signing" />
              </div>
              <div className="form-group">
                <label>Signatory Designation</label>
                <input value={form.hrDesignation} onChange={set("hrDesignation")} placeholder="e.g. HR Manager" />
              </div>
            </div>

            <h2 style={{ marginTop: "1rem" }}>Promotion Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Employee Name *</label>
                <input value={form.employeeName} onChange={set("employeeName")} placeholder="Full name of the employee" />
              </div>
              <div className="form-group">
                <label>Employee ID</label>
                <input value={form.empId} onChange={set("empId")} placeholder="e.g. EMP-001 (optional)" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Current Designation *</label>
                <input value={form.currentDesignation} onChange={set("currentDesignation")} placeholder="e.g. Software Engineer" />
              </div>
              <div className="form-group">
                <label>New Designation *</label>
                <input value={form.newDesignation} onChange={set("newDesignation")} placeholder="e.g. Senior Software Engineer" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <input value={form.department} onChange={set("department")} placeholder="e.g. Engineering (optional)" />
              </div>
              <div className="form-group">
                <label>Reporting To</label>
                <input value={form.reportingTo} onChange={set("reportingTo")} placeholder="e.g. Priya Sharma, VP Engineering (optional)" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Revised Salary (Rs.)</label>
                <input type="number" value={form.newSalary} onChange={set("newSalary")} placeholder="e.g. 1500000 (optional)" />
              </div>
              <div className="form-group">
                <label>Salary Basis</label>
                <select value={form.salaryBasis} onChange={set("salaryBasis")}>
                  <option value="per annum (CTC)">Per Annum (CTC)</option>
                  <option value="per month (gross)">Per Month (Gross)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Effective From *</label>
              <input type="date" value={form.effectiveDate} onChange={set("effectiveDate")} />
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem" }}>
                {form.companyName || "Company Name"}
              </p>
              {form.companyAddress && (
                <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#666" }}>{form.companyAddress}</p>
              )}
              <h3 className="doc-title" style={{ textAlign: "center", marginBottom: "0.5rem", textDecoration: "underline" }}>
                PROMOTION LETTER
              </h3>

              <div className="field-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
                {form.referenceNo ? <span><span className="field-label">Ref No:</span> {form.referenceNo}</span> : <span />}
                <span><span className="field-label">Date:</span> {fmtDate(form.issueDate)}</span>
              </div>

              <hr />

              <p style={{ marginTop: "1rem" }}>
                <strong>To,</strong><br />
                {form.employeeName || "Employee Name"}<br />
                {form.currentDesignation || "Current Designation"}{form.empId ? ` (Employee ID: ${form.empId})` : ""}
              </p>

              <p style={{ marginTop: "0.75rem", fontWeight: "bold" }}>Subject: Promotion to {form.newDesignation || "New Designation"}</p>

              <p style={{ marginTop: "0.75rem" }}>Dear {form.employeeName ? form.employeeName.split(" ")[0] : "Employee"},</p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>{bodyText}</p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                All other terms and conditions of your employment remain unchanged. We congratulate you on this achievement and wish you continued success in your new role.
              </p>

              <div style={{ marginTop: "2.5rem" }}>
                <p style={{ marginBottom: "0.25rem" }}>Yours sincerely,</p>
                <div className="signature-line" style={{ marginTop: "2rem", borderTop: "1px solid #999", width: "200px", paddingTop: "0.25rem" }}>
                  <p style={{ fontWeight: "bold" }}>{form.hrName || "Authorised Signatory"}</p>
                  {form.hrDesignation && <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.hrDesignation}</p>}
                  <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.companyName || "Company"}</p>
                </div>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn btn-primary" onClick={handleDownload}>Download PDF</button>
              <button className="btn btn-secondary" onClick={printPreview}>Print</button>
              <button className="btn btn-whatsapp" onClick={handleWhatsApp}>WhatsApp</button>
            </div>
          </div>
        </div>

        <ShareButtons text="Free promotion letter generator online — no login needed! Try it:" toolName="this generator" />
        <ConversionCTA />
        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, form, bodyText) {
  ctx.addLine(form.companyName || "Company Name", { bold: true, size: 14, align: "center" });
  if (form.companyAddress) {
    ctx.addLine(form.companyAddress, { size: 10, align: "center" });
  }
  ctx.addGap();
  ctx.addLine("PROMOTION LETTER", { bold: true, size: 14, align: "center" });
  ctx.addGap();

  if (form.referenceNo) {
    ctx.addFieldRow("Ref No:", form.referenceNo);
  }
  ctx.addFieldRow("Date:", fmtDate(form.issueDate));
  ctx.addHr();
  ctx.addGap();

  ctx.addLine("To,", { bold: true, size: 11 });
  ctx.addLine(form.employeeName || "Employee Name", { size: 11 });
  ctx.addLine(
    (form.currentDesignation || "Current Designation") + (form.empId ? ` (Employee ID: ${form.empId})` : ""),
    { size: 11 }
  );
  ctx.addGap();

  ctx.addLine(`Subject: Promotion to ${form.newDesignation || "New Designation"}`, { bold: true, size: 11 });
  ctx.addGap();

  ctx.addLine(`Dear ${form.employeeName ? form.employeeName.split(" ")[0] : "Employee"},`, { size: 11 });
  ctx.addGap();

  ctx.addParagraph(bodyText);
  ctx.addGap();

  ctx.addParagraph(
    "All other terms and conditions of your employment remain unchanged. We congratulate you on this achievement and wish you continued success in your new role."
  );
  ctx.addGap(3);

  ctx.addLine("Yours sincerely,", { size: 11 });
  ctx.addGap(3);
  ctx.addHr();
  ctx.addLine(form.hrName || "Authorised Signatory", { bold: true, size: 11 });
  if (form.hrDesignation) {
    ctx.addLine(form.hrDesignation, { size: 10 });
  }
  ctx.addLine(form.companyName || "Company", { size: 10 });
}
