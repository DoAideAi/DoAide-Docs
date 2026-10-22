import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import ConversionCTA from "../components/ConversionCTA";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "increment-letter-generator";

const FAQS = [
  {
    q: "What is a salary increment letter?",
    a: "A salary increment letter is a formal letter from an employer informing an employee that their salary has been revised upwards, usually after an appraisal. It states the new salary or CTC, the increment amount or percentage, and the date from which the revision is effective.",
  },
  {
    q: "What should an increment letter include?",
    a: "It should include the employee's name and designation, the appraisal or review period, the old and new salary or CTC, the increment percentage, the effective date, and the signature of the HR manager or authorised signatory on company letterhead.",
  },
  {
    q: "When are increment letters usually issued in India?",
    a: "Most Indian companies issue increment letters after the annual appraisal cycle, typically in April (financial year start) or on the employee's work anniversary. Mid-year revisions are also given for promotions or market corrections.",
  },
  {
    q: "Is an increment letter a legal document?",
    a: "Yes, once issued and accepted it becomes part of the employment record and modifies the compensation terms of the original appointment letter. Employees often need it for loan applications, visa processing, and background verification.",
  },
  {
    q: "What is the difference between an increment letter and an appraisal letter?",
    a: "An appraisal letter summarises the employee's performance evaluation and rating, while an increment letter specifically communicates the salary revision. Many companies combine both into a single appraisal-cum-increment letter.",
  },
  {
    q: "Is this increment letter generator free?",
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
  if (!v || Number.isNaN(n)) return "________";
  return "Rs. " + n.toLocaleString("en-IN");
}

function incrementPct(oldSalary, newSalary) {
  const o = Number(oldSalary);
  const n = Number(newSalary);
  if (!o || !n || n <= o) return null;
  return (((n - o) / o) * 100).toFixed(1);
}

export default function IncrementLetterGenerator() {
  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    hrName: "",
    hrDesignation: "HR Manager",
    issueDate: todayStr(),
    referenceNo: "",
    employeeName: "",
    empDesignation: "",
    empId: "",
    reviewPeriod: "",
    oldSalary: "",
    newSalary: "",
    salaryBasis: "per annum (CTC)",
    effectiveDate: todayStr(),
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const pct = incrementPct(form.oldSalary, form.newSalary);

  const handleDownload = () => {
    createPdf({
      title: "SALARY INCREMENT LETTER",
      filename: `increment-letter-${form.issueDate || "undated"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form, pct),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just created a salary increment letter using DoAide Docs -- completely free and no login needed. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  const bodyText = `We are pleased to inform you that, in recognition of your performance and contribution during ${form.reviewPeriod || "the review period"}, your compensation has been revised from ${fmtAmount(form.oldSalary)} to ${fmtAmount(form.newSalary)} ${form.salaryBasis}${pct ? ` — an increase of ${pct}%` : ""}. The revised compensation is effective from ${fmtDate(form.effectiveDate)}.`;

  return (
    <>
      <SeoHead
        title="Free Salary Increment Letter Generator Online | DoAide Docs"
        description="Generate a professional salary increment letter online for free. Enter old and new salary, get the increment percentage calculated automatically, and download as PDF. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Increment Letter</span> Generator</h1>
          <p>Create a professional salary increment letter in minutes. The increment percentage is calculated automatically. Preview live and download as PDF. 100% free, no sign-up needed.</p>
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
                <input value={form.referenceNo} onChange={set("referenceNo")} placeholder="e.g. HR/INC/2026/001 (optional)" />
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

            <h2 style={{ marginTop: "1rem" }}>Employee Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Employee Name *</label>
                <input value={form.employeeName} onChange={set("employeeName")} placeholder="Full name of the employee" />
              </div>
              <div className="form-group">
                <label>Designation *</label>
                <input value={form.empDesignation} onChange={set("empDesignation")} placeholder="e.g. Senior Developer" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Employee ID</label>
                <input value={form.empId} onChange={set("empId")} placeholder="e.g. EMP-001 (optional)" />
              </div>
              <div className="form-group">
                <label>Review Period *</label>
                <input value={form.reviewPeriod} onChange={set("reviewPeriod")} placeholder="e.g. FY 2025-26" />
              </div>
            </div>

            <h2 style={{ marginTop: "1rem" }}>Salary Revision</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Current Salary (Rs.) *</label>
                <input type="number" value={form.oldSalary} onChange={set("oldSalary")} placeholder="e.g. 800000" />
              </div>
              <div className="form-group">
                <label>Revised Salary (Rs.) *</label>
                <input type="number" value={form.newSalary} onChange={set("newSalary")} placeholder="e.g. 920000" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Salary Basis</label>
                <select value={form.salaryBasis} onChange={set("salaryBasis")}>
                  <option value="per annum (CTC)">Per Annum (CTC)</option>
                  <option value="per month (gross)">Per Month (Gross)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Effective From *</label>
                <input type="date" value={form.effectiveDate} onChange={set("effectiveDate")} />
              </div>
            </div>
            {pct && (
              <div className="form-group">
                <label>Calculated Increment</label>
                <input value={`${pct}%`} readOnly />
              </div>
            )}
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
                SALARY INCREMENT LETTER
              </h3>

              <div className="field-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
                {form.referenceNo ? <span><span className="field-label">Ref No:</span> {form.referenceNo}</span> : <span />}
                <span><span className="field-label">Date:</span> {fmtDate(form.issueDate)}</span>
              </div>

              <hr />

              <p style={{ marginTop: "1rem" }}>
                <strong>To,</strong><br />
                {form.employeeName || "Employee Name"}<br />
                {form.empDesignation || "Designation"}{form.empId ? ` (Employee ID: ${form.empId})` : ""}
              </p>

              <p style={{ marginTop: "0.75rem", fontWeight: "bold" }}>Subject: Revision of Compensation</p>

              <p style={{ marginTop: "0.75rem" }}>Dear {form.employeeName ? form.employeeName.split(" ")[0] : "Employee"},</p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>{bodyText}</p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                All other terms and conditions of your employment remain unchanged. We thank you for your dedication and look forward to your continued contribution.
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

        <ShareButtons text="Free salary increment letter generator online — no login needed! Try it:" toolName="this generator" />
        <ConversionCTA />
        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, form, pct) {
  ctx.addLine(form.companyName || "Company Name", { bold: true, size: 14, align: "center" });
  if (form.companyAddress) {
    ctx.addLine(form.companyAddress, { size: 10, align: "center" });
  }
  ctx.addGap();
  ctx.addLine("SALARY INCREMENT LETTER", { bold: true, size: 14, align: "center" });
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
    (form.empDesignation || "Designation") + (form.empId ? ` (Employee ID: ${form.empId})` : ""),
    { size: 11 }
  );
  ctx.addGap();

  ctx.addLine("Subject: Revision of Compensation", { bold: true, size: 11 });
  ctx.addGap();

  ctx.addLine(`Dear ${form.employeeName ? form.employeeName.split(" ")[0] : "Employee"},`, { size: 11 });
  ctx.addGap();

  ctx.addParagraph(
    `We are pleased to inform you that, in recognition of your performance and contribution during ${form.reviewPeriod || "the review period"}, your compensation has been revised from ${fmtAmount(form.oldSalary)} to ${fmtAmount(form.newSalary)} ${form.salaryBasis}${pct ? ` — an increase of ${pct}%` : ""}. The revised compensation is effective from ${fmtDate(form.effectiveDate)}.`
  );
  ctx.addGap();

  ctx.addParagraph(
    "All other terms and conditions of your employment remain unchanged. We thank you for your dedication and look forward to your continued contribution."
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
