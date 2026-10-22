import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import ConversionCTA from "../components/ConversionCTA";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "character-certificate-generator";

const ISSUER_TYPES = [
  { key: "school", label: "School / College" },
  { key: "employer", label: "Employer" },
  { key: "society", label: "Society / Residence" },
];

const CONDUCT_OPTIONS = ["Excellent", "Very Good", "Good", "Satisfactory"];

const FAQS = [
  {
    q: "What is a character certificate?",
    a: "A character certificate is a formal document stating that a person bears a good moral character and has no record of misconduct during their association with an institution, employer, or residence. It is commonly required for government job applications, college admissions, passport verification, and police verification in India.",
  },
  {
    q: "Who can issue a character certificate in India?",
    a: "A character certificate can be issued by the head of a school or college, a current or former employer, a gazetted officer, or the secretary of a housing society or local authority who has known the person for a reasonable period.",
  },
  {
    q: "Is a character certificate required for government jobs?",
    a: "Yes, most government job applications in India require one or two character certificates from gazetted officers or heads of institutions, usually issued within the last six months.",
  },
  {
    q: "What details should a character certificate include?",
    a: "It should include the person's full name, father's or guardian's name, address, the period for which the issuer has known the person, a statement about their conduct and character, the issue date, and the issuer's name, designation, signature, and seal.",
  },
  {
    q: "How long is a character certificate valid?",
    a: "There is no fixed legal validity, but most institutions and government bodies expect the certificate to be issued within the last six months. Always check the specific requirement of the organisation asking for it.",
  },
  {
    q: "Is this character certificate generator free?",
    a: "Yes, this generator is 100% free with no login required. The certificate is generated entirely in your browser and can be downloaded as a PDF instantly.",
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
  const parent = form.fatherName ? `, ${form.relation} of ${form.fatherName},` : "";
  const address = form.address || "________";
  const period = form.knownSince || "________";
  switch (issuerType) {
    case "school":
      return `This is to certify that ${person}${parent} residing at ${address}, was a bonafide student of ${form.issuerOrg || "________"} from ${period}. During this period, ${person} bore a ${form.conduct.toLowerCase()} moral character and was found to be sincere, honest, and hardworking. To the best of my knowledge, ${person} has no record of misconduct or indiscipline.`;
    case "employer":
      return `This is to certify that ${person}${parent} residing at ${address}, has been employed with ${form.issuerOrg || "________"} since ${period}. During the period of employment, ${person} has borne a ${form.conduct.toLowerCase()} moral character and has conducted themselves with integrity and professionalism. To the best of my knowledge, ${person} has no record of misconduct.`;
    default:
      return `This is to certify that ${person}${parent} has been residing at ${address} since ${period} and is personally known to me. During this period, ${person} has borne a ${form.conduct.toLowerCase()} moral character and enjoys a good reputation in the locality. To the best of my knowledge, ${person} has no record of any unlawful activity or misconduct.`;
  }
}

export default function CharacterCertificateGenerator() {
  const [issuerType, setIssuerType] = useState("school");
  const [form, setForm] = useState({
    issuerName: "",
    issuerDesignation: "",
    issuerOrg: "",
    issueDate: todayStr(),
    referenceNo: "",
    personName: "",
    relation: "son",
    fatherName: "",
    address: "",
    knownSince: "",
    conduct: "Good",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "CHARACTER CERTIFICATE",
      filename: `character-certificate-${form.issueDate || "undated"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, issuerType, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just created a character certificate using DoAide Docs -- completely free and no login needed. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Character Certificate Generator Online India | DoAide Docs"
        description="Generate a character certificate online for free — for school, college, employer, or residence. Professional format accepted for government jobs, admissions, and police verification. Download as PDF instantly."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Character Certificate</span> Generator</h1>
          <p>Create a professional character certificate for school, employment, or residence verification. Fill the details, preview live, and download as PDF. 100% free, no sign-up needed.</p>
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
                <input value={form.issuerName} onChange={set("issuerName")} placeholder="Principal / Manager / Secretary name" />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input value={form.issuerDesignation} onChange={set("issuerDesignation")} placeholder="e.g. Principal, HR Manager" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Institution / Organisation *</label>
                <input value={form.issuerOrg} onChange={set("issuerOrg")} placeholder="School, company, or society name" />
              </div>
              <div className="form-group">
                <label>Issue Date *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
            </div>
            <div className="form-group">
              <label>Reference No</label>
              <input value={form.referenceNo} onChange={set("referenceNo")} placeholder="e.g. CC/2026/001 (optional)" />
            </div>

            <h2 style={{ marginTop: "1rem" }}>Person Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input value={form.personName} onChange={set("personName")} placeholder="Name of person certified" />
              </div>
              <div className="form-group">
                <label>Relation</label>
                <select value={form.relation} onChange={set("relation")}>
                  <option value="son">Son of</option>
                  <option value="daughter">Daughter of</option>
                  <option value="wife">Wife of</option>
                  <option value="ward">Ward of</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Father's / Guardian's Name</label>
                <input value={form.fatherName} onChange={set("fatherName")} placeholder="e.g. Ramesh Kumar" />
              </div>
              <div className="form-group">
                <label>Known Since / Period *</label>
                <input value={form.knownSince} onChange={set("knownSince")} placeholder="e.g. June 2019 or 2019 to 2024" />
              </div>
            </div>
            <div className="form-group">
              <label>Address *</label>
              <input value={form.address} onChange={set("address")} placeholder="Full residential address" />
            </div>
            <div className="form-group">
              <label>Conduct</label>
              <select value={form.conduct} onChange={set("conduct")}>
                {CONDUCT_OPTIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem" }}>
                {form.issuerOrg || "Institution / Organisation Name"}
              </p>
              <h3 className="doc-title" style={{ textAlign: "center", marginBottom: "0.5rem", textDecoration: "underline" }}>
                CHARACTER CERTIFICATE
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
                This certificate is issued on {fmtDate(form.issueDate)} at the request of {form.personName || "the applicant"} for official purposes.
              </p>

              <div style={{ marginTop: "2.5rem" }}>
                <div className="signature-line" style={{ marginTop: "2rem", borderTop: "1px solid #999", width: "200px", paddingTop: "0.25rem" }}>
                  <p style={{ fontWeight: "bold" }}>{form.issuerName || "Authorized Signatory"}</p>
                  {form.issuerDesignation && <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.issuerDesignation}</p>}
                  <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.issuerOrg || "Institution / Organisation"}</p>
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

        <ShareButtons text="Free character certificate generator online — no login needed! Try it:" toolName="this generator" />
        <ConversionCTA />
        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, issuerType, form) {
  ctx.addLine(form.issuerOrg || "Institution / Organisation Name", { bold: true, size: 14, align: "center" });
  ctx.addGap();
  ctx.addLine("CHARACTER CERTIFICATE", { bold: true, size: 14, align: "center" });
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
    `This certificate is issued on ${fmtDate(form.issueDate)} at the request of ${form.personName || "the applicant"} for official purposes.`
  );
  ctx.addGap(3);

  ctx.addHr();
  ctx.addLine(form.issuerName || "Authorized Signatory", { bold: true, size: 11 });
  if (form.issuerDesignation) {
    ctx.addLine(form.issuerDesignation, { size: 10 });
  }
  ctx.addLine(form.issuerOrg || "Institution / Organisation", { size: 10 });
}
