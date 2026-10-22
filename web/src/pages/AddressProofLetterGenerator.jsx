import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import ConversionCTA from "../components/ConversionCTA";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "address-proof-letter-generator";

const ISSUER_TYPES = [
  { key: "employer", label: "Employer" },
  { key: "landlord", label: "Landlord" },
  { key: "society", label: "Housing Society" },
];

const FAQS = [
  {
    q: "What is an address proof letter?",
    a: "An address proof letter is a formal letter from an employer, landlord, or housing society confirming that a person resides at a particular address. It is commonly used for bank account opening, SIM card issuance, gas connections, and other KYC requirements in India.",
  },
  {
    q: "Who can issue an address proof letter?",
    a: "An employer can issue it on company letterhead for an employee, a landlord can issue it for a tenant (often alongside the rent agreement), and a housing society secretary can issue it for a resident member. Each should sign and date the letter.",
  },
  {
    q: "Is an employer address proof letter accepted by banks?",
    a: "Many banks accept a letter from a recognised employer on official letterhead as a supporting address proof for account opening, although requirements vary by bank. It usually works best alongside a primary document such as Aadhaar, a rent agreement, or a utility bill.",
  },
  {
    q: "What details should an address proof letter include?",
    a: "It should include the person's full name, their complete residential address, how the issuer knows the person (employee, tenant, or member), the period of stay if known, the issue date, and the issuer's name, designation, signature, and contact details.",
  },
  {
    q: "Can a landlord letter be used as address proof for a tenant?",
    a: "Yes, a letter from the landlord confirming tenancy, usually with a copy of the registered rent agreement, is widely used as address proof by tenants for KYC, school admissions, and government applications.",
  },
  {
    q: "Is this address proof letter generator free?",
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

function getBodyText(issuerType, form) {
  const person = form.personName || "________";
  const address = form.address || "________";
  const since = form.residingSince ? ` since ${form.residingSince}` : "";
  switch (issuerType) {
    case "employer":
      return `This is to certify that ${person}, ${form.empDesignation || "________"}${form.empId ? ` (Employee ID: ${form.empId})` : ""}, is employed with ${form.issuerOrg || "________"}. As per our records, ${person} resides at the following address${since}: ${address}.`;
    case "landlord":
      return `This is to certify that ${person} is residing as my tenant at the following address${since}: ${address}. The tenancy is governed by a rent agreement executed between us, and the tenant has been regular in occupation of the premises.`;
    default:
      return `This is to certify that ${person} is a resident member of ${form.issuerOrg || "________"} and resides at the following address${since}: ${address}. The member's occupation of the premises is duly recorded in the society's register.`;
  }
}

export default function AddressProofLetterGenerator() {
  const [issuerType, setIssuerType] = useState("employer");
  const [form, setForm] = useState({
    issuerName: "",
    issuerDesignation: "",
    issuerOrg: "",
    issuerContact: "",
    issueDate: todayStr(),
    referenceNo: "",
    personName: "",
    empDesignation: "",
    empId: "",
    address: "",
    residingSince: "",
    purpose: "bank account opening / KYC verification",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "ADDRESS PROOF LETTER",
      filename: `address-proof-letter-${form.issueDate || "undated"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, issuerType, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just created an address proof letter using DoAide Docs -- completely free and no login needed. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Address Proof Letter Generator Online India | DoAide Docs"
        description="Generate an address proof letter online for free — from employer, landlord, or housing society. Professional format for bank KYC, SIM cards, and verification. Download as PDF instantly."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Address Proof Letter</span> Generator</h1>
          <p>Create an address proof letter from an employer, landlord, or housing society. Fill the details, preview live, and download as PDF. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Issued By</h2>
            <div className="noc-type-tabs">
              {ISSUER_TYPES.map((t) => (
                <button
                  key={t.key}
                  className={`noc-type-tab${issuerType === t.key ? " active" : ""}`}
                  onClick={() => setIssuerType(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <h2>Issuer Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Issuer Name *</label>
                <input value={form.issuerName} onChange={set("issuerName")} placeholder={issuerType === "landlord" ? "Landlord's full name" : "Name of the person signing"} />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input value={form.issuerDesignation} onChange={set("issuerDesignation")} placeholder={issuerType === "landlord" ? "e.g. Owner of the premises" : "e.g. HR Manager, Secretary"} />
              </div>
            </div>
            {issuerType !== "landlord" && (
              <div className="form-group">
                <label>{issuerType === "employer" ? "Company Name *" : "Society Name *"}</label>
                <input value={form.issuerOrg} onChange={set("issuerOrg")} placeholder={issuerType === "employer" ? "e.g. Acme Technologies Pvt Ltd" : "e.g. Green Meadows CHS Ltd"} />
              </div>
            )}
            <div className="form-row">
              <div className="form-group">
                <label>Issue Date *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
              <div className="form-group">
                <label>Contact (Phone / Email)</label>
                <input value={form.issuerContact} onChange={set("issuerContact")} placeholder="For verification (optional)" />
              </div>
            </div>
            <div className="form-group">
              <label>Reference No</label>
              <input value={form.referenceNo} onChange={set("referenceNo")} placeholder="e.g. APL/2026/001 (optional)" />
            </div>

            <h2 style={{ marginTop: "1rem" }}>Resident Details</h2>
            <div className="form-group">
              <label>Full Name *</label>
              <input value={form.personName} onChange={set("personName")} placeholder={issuerType === "landlord" ? "Tenant's full name" : "Person's full name"} />
            </div>
            {issuerType === "employer" && (
              <div className="form-row">
                <div className="form-group">
                  <label>Designation *</label>
                  <input value={form.empDesignation} onChange={set("empDesignation")} placeholder="e.g. Senior Developer" />
                </div>
                <div className="form-group">
                  <label>Employee ID</label>
                  <input value={form.empId} onChange={set("empId")} placeholder="e.g. EMP-001 (optional)" />
                </div>
              </div>
            )}
            <div className="form-group">
              <label>Residential Address *</label>
              <input value={form.address} onChange={set("address")} placeholder="Full address with city and PIN code" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Residing Since</label>
                <input value={form.residingSince} onChange={set("residingSince")} placeholder="e.g. April 2022 (optional)" />
              </div>
              <div className="form-group">
                <label>Purpose</label>
                <select value={form.purpose} onChange={set("purpose")}>
                  <option value="bank account opening / KYC verification">Bank Account / KYC</option>
                  <option value="SIM card / telecom verification">SIM Card / Telecom</option>
                  <option value="gas / utility connection">Gas / Utility Connection</option>
                  <option value="school / college admission">School / College Admission</option>
                  <option value="official records and verification">General Verification</option>
                </select>
              </div>
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem" }}>
                {issuerType === "landlord" ? (form.issuerName || "Landlord Name") : (form.issuerOrg || "Organisation Name")}
              </p>
              <h3 className="doc-title" style={{ textAlign: "center", marginBottom: "0.5rem", textDecoration: "underline" }}>
                ADDRESS PROOF LETTER
              </h3>

              <div className="field-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
                {form.referenceNo ? <span><span className="field-label">Ref No:</span> {form.referenceNo}</span> : <span />}
                <span><span className="field-label">Date:</span> {fmtDate(form.issueDate)}</span>
              </div>

              <hr />

              <p style={{ marginTop: "1rem", fontWeight: "bold" }}>To Whom It May Concern,</p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                {getBodyText(issuerType, form)}
              </p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                This letter is issued on {fmtDate(form.issueDate)} at the request of {form.personName || "the applicant"} for the purpose of {form.purpose}.
                {form.issuerContact ? ` For any verification, please contact ${form.issuerContact}.` : ""}
              </p>

              <div style={{ marginTop: "2.5rem" }}>
                <p style={{ marginBottom: "0.25rem" }}>Yours faithfully,</p>
                <div className="signature-line" style={{ marginTop: "2rem", borderTop: "1px solid #999", width: "200px", paddingTop: "0.25rem" }}>
                  <p style={{ fontWeight: "bold" }}>{form.issuerName || "Authorized Signatory"}</p>
                  {form.issuerDesignation && <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.issuerDesignation}</p>}
                  {issuerType !== "landlord" && <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.issuerOrg || "Organisation"}</p>}
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

        <ShareButtons text="Free address proof letter generator online — no login needed! Try it:" toolName="this generator" />
        <ConversionCTA />
        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, issuerType, form) {
  ctx.addLine(
    issuerType === "landlord" ? (form.issuerName || "Landlord Name") : (form.issuerOrg || "Organisation Name"),
    { bold: true, size: 14, align: "center" }
  );
  ctx.addGap();
  ctx.addLine("ADDRESS PROOF LETTER", { bold: true, size: 14, align: "center" });
  ctx.addGap();

  if (form.referenceNo) {
    ctx.addFieldRow("Ref No:", form.referenceNo);
  }
  ctx.addFieldRow("Date:", fmtDate(form.issueDate));
  ctx.addHr();
  ctx.addGap();

  ctx.addLine("To Whom It May Concern,", { bold: true, size: 11 });
  ctx.addGap();

  ctx.addParagraph(getBodyText(issuerType, form));
  ctx.addGap();

  ctx.addParagraph(
    `This letter is issued on ${fmtDate(form.issueDate)} at the request of ${form.personName || "the applicant"} for the purpose of ${form.purpose}.` +
      (form.issuerContact ? ` For any verification, please contact ${form.issuerContact}.` : "")
  );
  ctx.addGap(3);

  ctx.addLine("Yours faithfully,", { size: 11 });
  ctx.addGap(3);
  ctx.addHr();
  ctx.addLine(form.issuerName || "Authorized Signatory", { bold: true, size: 11 });
  if (form.issuerDesignation) {
    ctx.addLine(form.issuerDesignation, { size: 10 });
  }
  if (issuerType !== "landlord") {
    ctx.addLine(form.issuerOrg || "Organisation", { size: 10 });
  }
}
