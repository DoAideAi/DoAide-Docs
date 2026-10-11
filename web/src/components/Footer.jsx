import { Link } from "react-router-dom";

const TOOL_LINKS = [
  { to: "/rent-receipt-generator", label: "Rent Receipt" },
  { to: "/rental-agreement-generator", label: "Rental Agreement" },
  { to: "/salary-slip-generator", label: "Salary Slip" },
  { to: "/invoice-generator", label: "Invoice" },
  { to: "/experience-letter-generator", label: "Experience Letter" },
  { to: "/resignation-letter-generator", label: "Resignation Letter" },
];

const DOAIDE_LINKS = [
  { href: "https://gst.doaide.com", label: "GST Tools" },
  { href: "https://409.doaide.com", label: "409A Valuations" },
  { href: "https://pulse.doaide.com", label: "Pulse" },
  { href: "https://med.doaide.com", label: "Med" },
  { href: "https://job.doaide.com", label: "Job" },
  { href: "https://desk.doaide.com", label: "Desk" },
  { href: "https://realty.doaide.com", label: "Realty" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">DoAide <span style={{ color: "var(--da-text-muted)", fontWeight: 300 }}>|</span> <span style={{ color: "var(--da-text)", fontWeight: 600 }}>Docs</span></div>
      <div className="footer-links">
        {TOOL_LINKS.map((l) => (
          <Link key={l.to} to={l.to}>{l.label}</Link>
        ))}
      </div>
      <div className="footer-links" style={{ marginBottom: "1.5rem" }}>
        {DOAIDE_LINKS.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
        ))}
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "var(--da-primary-bg)", color: "var(--da-primary)", padding: "0.3rem 0.75rem", borderRadius: "16px", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.75rem", border: "1px solid rgba(13,148,136,0.2)" }}>
        A DoAide Product
      </div>
      <p>&copy; {new Date().getFullYear()} DoAide. Free document generators for India. No login required.</p>
    </footer>
  );
}
