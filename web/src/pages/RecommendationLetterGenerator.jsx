import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import ConversionCTA from "../components/ConversionCTA";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "recommendation-letter-generator";

const LETTER_TYPES = [
  { value: "employment", label: "Employment Recommendation" },
  { value: "academic", label: "Academic Recommendation" },
  { value: "character", label: "Character / Personal Reference" },
];

const FAQS = [
  { q: "What is a recommendation letter?", a: "A recommendation letter (also called a reference letter) is a formal document written by a former employer, professor, or mentor that vouches for a person's skills, character, and achievements. It is used to support job applications, university admissions, scholarships, and professional memberships." },
  { q: "Who should write a recommendation letter?", a: "Ideally, someone who has directly supervised or worked with the candidate — a manager, department head, professor, or mentor. The writer should be able to speak specifically about the candidate's abilities, work ethic, and contributions." },
  { q: "What should a recommendation letter include?", a: "A strong recommendation letter includes: the writer's relationship with the candidate, duration of association, specific examples of achievements or skills, the candidate's strengths and character, and a clear endorsement for the role or opportunity they are pursuing." },
  { q: "How long should a recommendation letter be?", a: "A recommendation letter should be one page (300–500 words). It should be concise but substantive — long enough to include specific examples and a strong endorsement, but short enough that the reader can absorb it quickly." },
  { q: "Is a recommendation letter different from a reference letter?", a: "The terms are often used interchangeably. However, a recommendation letter is typically addressed to a specific recipient for a specific opportunity, while a reference letter is a general endorsement that can be used for multiple purposes ('To Whom It May Concern')." },
  { q: "Can I write my own recommendation letter?", a: "While it is not ideal, it is common for the candidate to draft the letter for the recommender to review and sign. This tool helps you create a professional draft that the recommender can customise before signing." },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(iso) {
  if (!iso) return "___";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function RecommendationLetterGenerator() {
  const [form, setForm] = useState({
    letterType: "employment",
    candidateName: "",
    candidateDesignation: "",
    candidateDepartment: "",
    organisation: "",
    organisationAddress: "",
    dateFrom: "",
    dateTo: "",
    recipientName: "",
    recipientOrg: "",
    skills: "",
    achievements: "",
    recommenderName: "",
    recommenderDesignation: "",
    recommenderOrg: "",
    recommenderRelation: "",
    issueDate: todayStr(),
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const isEmployment = form.letterType === "employment";
  const isAcademic = form.letterType === "academic";

  function bodyText() {
    const name = form.candidateName || "the candidate";
    const org = form.organisation || "our organisation";
    const role = form.candidateDesignation || "their role";
    const dept = form.candidateDepartment ? ` in the ${form.candidateDepartment} department` : "";
    const tenure = form.dateFrom && form.dateTo
      ? ` from ${fmtDate(form.dateFrom)} to ${fmtDate(form.dateTo)}`
      : "";

    if (isEmployment) {
      return [
        `I am writing to recommend ${name} for any suitable opportunity. ${name} worked with ${org} as a ${role}${dept}${tenure}.`,
        form.skills
          ? `During this period, ${name} demonstrated exceptional skills in ${form.skills}. They consistently delivered high-quality work and showed strong initiative.`
          : `During this period, ${name} consistently demonstrated professionalism, dedication, and a strong work ethic.`,
        form.achievements
          ? `Notable achievements include: ${form.achievements}.`
          : `${name} made valuable contributions to the team and was well-regarded by colleagues and management alike.`,
        `I have no hesitation in recommending ${name} and believe they would be a valuable asset to any organisation. Please feel free to contact me for any further information.`,
      ];
    }
    if (isAcademic) {
      return [
        `I am writing to recommend ${name} for academic pursuits. I have had the privilege of ${form.recommenderRelation || "mentoring"} ${name} at ${org}${tenure}.`,
        form.skills
          ? `${name} has demonstrated outstanding aptitude in ${form.skills}. Their intellectual curiosity and analytical ability set them apart from their peers.`
          : `${name} has consistently demonstrated intellectual curiosity, analytical ability, and a genuine passion for learning.`,
        form.achievements
          ? `Their notable achievements include: ${form.achievements}.`
          : `${name} actively participated in academic and extracurricular activities, showing both breadth and depth of capability.`,
        `I wholeheartedly recommend ${name} for admission and believe they will excel in their chosen programme. Please do not hesitate to reach out for any additional information.`,
      ];
    }
    return [
      `I am writing this letter to recommend ${name}, whom I have known ${form.recommenderRelation ? `as ${form.recommenderRelation}` : "personally"}${tenure}.`,
      `I can attest to ${name}'s integrity, reliability, and good character. They are a person of strong moral values who consistently demonstrates honesty and responsibility in all their dealings.`,
      form.skills
        ? `${name} possesses commendable qualities including ${form.skills}.`
        : `${name} is well-respected in the community and has always conducted themselves with dignity and professionalism.`,
      `I recommend ${name} without reservation and believe their character and integrity speak for themselves. Please feel free to contact me should you need any further information.`,
    ];
  }

  const handleDownload = () => {
    createPdf({
      title: "Recommendation Letter",
      filename: `recommendation-letter-${form.candidateName.replace(/\s+/g, "-") || "document"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form, bodyText()),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Recommendation Letter\nCandidate: ${form.candidateName}\nType: ${form.letterType}\nRecommender: ${form.recommenderName}\n\nGenerated at docs.doaide.com`
    );
  };

  const paragraphs = bodyText();

  return (
    <>
      <SeoHead
        title="Free Recommendation Letter Generator Online | DoAide Docs"
        description="Generate professional recommendation letters for employment, academic, or personal references. Customise and download as PDF for free."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Recommendation Letter</span> Generator</h1>
          <p>Create a professional recommendation letter for employment, academic, or personal references. Preview and download as PDF instantly.</p>
          <div className="free-badge">100% FREE — No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Letter Type</h2>
            <div className="form-group">
              <label>Type of Recommendation *</label>
              <select value={form.letterType} onChange={set("letterType")}>
                {LETTER_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <h2 style={{ marginTop: "1rem" }}>Candidate Details</h2>
            <div className="form-group">
              <label>Candidate Name *</label>
              <input value={form.candidateName} onChange={set("candidateName")} placeholder="Full name of the person being recommended" />
            </div>

            {(isEmployment || isAcademic) && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>{isAcademic ? "Programme / Course" : "Designation"} *</label>
                    <input value={form.candidateDesignation} onChange={set("candidateDesignation")} placeholder={isAcademic ? "e.g. M.Tech Computer Science" : "e.g. Software Engineer"} />
                  </div>
                  <div className="form-group">
                    <label>{isAcademic ? "Department / Faculty" : "Department"}</label>
                    <input value={form.candidateDepartment} onChange={set("candidateDepartment")} placeholder={isAcademic ? "e.g. Computer Science" : "e.g. Engineering"} />
                  </div>
                </div>

                <div className="form-group">
                  <label>{isAcademic ? "Institution Name" : "Organisation Name"}</label>
                  <input value={form.organisation} onChange={set("organisation")} placeholder={isAcademic ? "University / College name" : "Company name"} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>From Date</label>
                    <input type="date" value={form.dateFrom} onChange={set("dateFrom")} />
                  </div>
                  <div className="form-group">
                    <label>To Date</label>
                    <input type="date" value={form.dateTo} onChange={set("dateTo")} />
                  </div>
                </div>
              </>
            )}

            <h2 style={{ marginTop: "1rem" }}>Content</h2>
            <div className="form-group">
              <label>Key Skills / Qualities</label>
              <input value={form.skills} onChange={set("skills")} placeholder="e.g. leadership, problem-solving, communication" />
            </div>
            <div className="form-group">
              <label>Achievements (optional)</label>
              <textarea rows={3} value={form.achievements} onChange={set("achievements")} placeholder="Notable accomplishments, awards, or contributions..." />
            </div>

            <h2 style={{ marginTop: "1rem" }}>Recipient (optional)</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Recipient Name</label>
                <input value={form.recipientName} onChange={set("recipientName")} placeholder="e.g. Hiring Manager" />
              </div>
              <div className="form-group">
                <label>Recipient Organisation</label>
                <input value={form.recipientOrg} onChange={set("recipientOrg")} placeholder="e.g. Google India" />
              </div>
            </div>

            <h2 style={{ marginTop: "1rem" }}>Recommender Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Recommender Name</label>
                <input value={form.recommenderName} onChange={set("recommenderName")} placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input value={form.recommenderDesignation} onChange={set("recommenderDesignation")} placeholder="e.g. Senior Manager" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Organisation</label>
                <input value={form.recommenderOrg} onChange={set("recommenderOrg")} placeholder="Your company / institution" />
              </div>
              <div className="form-group">
                <label>Relationship to Candidate</label>
                <input value={form.recommenderRelation} onChange={set("recommenderRelation")} placeholder="e.g. direct supervisor, professor" />
              </div>
            </div>

            <div className="form-group">
              <label>Issue Date</label>
              <input type="date" value={form.issueDate} onChange={set("issueDate")} />
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p style={{ textAlign: "right", fontSize: "0.85rem", color: "#666" }}>
                Date: {fmtDate(form.issueDate)}
              </p>

              {(form.recipientName || form.recipientOrg) && (
                <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                  {form.recipientName && <p style={{ margin: 0 }}>{form.recipientName}</p>}
                  {form.recipientOrg && <p style={{ margin: 0, color: "#666" }}>{form.recipientOrg}</p>}
                </div>
              )}

              <p style={{ fontSize: "0.9rem" }}>
                {form.recipientName ? `Dear ${form.recipientName},` : "To Whom It May Concern,"}
              </p>

              <h4 style={{ textAlign: "center", margin: "1rem 0", textDecoration: "underline" }}>
                LETTER OF RECOMMENDATION
              </h4>

              {paragraphs.map((p, i) => (
                <p key={i} style={{ lineHeight: "1.7", fontSize: "0.9rem" }}>{p}</p>
              ))}

              <p style={{ lineHeight: "1.7", fontSize: "0.9rem" }}>Yours sincerely,</p>

              <div style={{ marginTop: "2rem" }}>
                <div style={{ marginTop: "1.5rem" }}>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", display: "inline-block" }}>
                    {form.recommenderName || "Recommender Name"}
                  </p>
                  {form.recommenderDesignation && (
                    <p style={{ fontSize: "0.8rem", color: "#666", margin: "0.15rem 0" }}>{form.recommenderDesignation}</p>
                  )}
                  {form.recommenderOrg && (
                    <p style={{ fontSize: "0.8rem", color: "#666", margin: "0.15rem 0" }}>{form.recommenderOrg}</p>
                  )}
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

        <ShareButtons text="Free document generator online — no login needed! Try it:" toolName="this generator" />
        <ConversionCTA />
        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, form, paragraphs) {
  ctx.addLine(`Date: ${fmtDate(form.issueDate)}`, { size: 10, align: "right" });
  ctx.addGap();

  if (form.recipientName || form.recipientOrg) {
    if (form.recipientName) ctx.addLine(form.recipientName, { size: 10 });
    if (form.recipientOrg) ctx.addLine(form.recipientOrg, { size: 9, color: [100, 100, 100] });
    ctx.addGap();
  }

  ctx.addLine(form.recipientName ? `Dear ${form.recipientName},` : "To Whom It May Concern,", { size: 10 });
  ctx.addGap();

  ctx.addLine("LETTER OF RECOMMENDATION", { bold: true, size: 14, align: "center" });
  ctx.addGap(2);

  for (const para of paragraphs) {
    ctx.addParagraph(para);
    ctx.addGap();
  }

  ctx.addLine("Yours sincerely,", { size: 10 });
  ctx.addGap(3);

  ctx.addLine("________________________", { size: 10 });
  ctx.addLine(form.recommenderName || "Recommender Name", { bold: true, size: 10 });
  if (form.recommenderDesignation) {
    ctx.addLine(form.recommenderDesignation, { size: 9, color: [100, 100, 100] });
  }
  if (form.recommenderOrg) {
    ctx.addLine(form.recommenderOrg, { size: 9, color: [100, 100, 100] });
  }
}
