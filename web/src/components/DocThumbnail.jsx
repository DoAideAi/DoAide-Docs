// Mini document preview thumbnail for homepage tool cards.
// Pure SVG, no assets — picks a layout by document kind so each card
// hints at what the generated PDF looks like.

const KIND_BY_SLUG = {
  "rent-receipt-generator": "receipt",
  "invoice-generator": "receipt",
  "salary-slip-generator": "receipt",
  "rental-agreement-generator": "deed",
  "partnership-deed-generator": "deed",
  "power-of-attorney-generator": "deed",
  "affidavit-generator": "deed",
  "bonafide-certificate-generator": "certificate",
  "internship-certificate-generator": "certificate",
  "salary-certificate-generator": "certificate",
  "character-certificate-generator": "certificate",
  "noc-letter-generator": "certificate",
};

function Letter() {
  return (
    <>
      <rect x="10" y="10" width="26" height="4" rx="1" fill="var(--da-primary, #2563eb)" opacity="0.85" />
      <rect x="10" y="20" width="44" height="2.5" rx="1" fill="#cbd5e1" />
      <rect x="10" y="26" width="52" height="2.5" rx="1" fill="#cbd5e1" />
      <rect x="10" y="32" width="48" height="2.5" rx="1" fill="#cbd5e1" />
      <rect x="10" y="38" width="52" height="2.5" rx="1" fill="#cbd5e1" />
      <rect x="10" y="44" width="34" height="2.5" rx="1" fill="#cbd5e1" />
      <rect x="10" y="56" width="18" height="2.5" rx="1" fill="#94a3b8" />
      <rect x="10" y="62" width="24" height="2.5" rx="1" fill="#94a3b8" />
    </>
  );
}

function Certificate() {
  return (
    <>
      <rect x="8" y="8" width="56" height="60" rx="2" fill="none" stroke="var(--da-primary, #2563eb)" strokeWidth="1.5" opacity="0.5" />
      <rect x="20" y="16" width="32" height="4" rx="1" fill="var(--da-primary, #2563eb)" opacity="0.85" />
      <rect x="16" y="28" width="40" height="2.5" rx="1" fill="#cbd5e1" />
      <rect x="14" y="34" width="44" height="2.5" rx="1" fill="#cbd5e1" />
      <rect x="16" y="40" width="40" height="2.5" rx="1" fill="#cbd5e1" />
      <circle cx="36" cy="55" r="6" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8" />
      <path d="M33.5 55l1.8 1.8 3.2-3.6" stroke="#f59e0b" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </>
  );
}

function Receipt() {
  return (
    <>
      <rect x="10" y="10" width="30" height="4" rx="1" fill="var(--da-primary, #2563eb)" opacity="0.85" />
      <rect x="10" y="20" width="52" height="7" rx="1" fill="var(--da-primary, #2563eb)" opacity="0.15" />
      <rect x="12" y="22.5" width="14" height="2" rx="1" fill="#64748b" />
      <rect x="44" y="22.5" width="14" height="2" rx="1" fill="#64748b" />
      {[31, 38, 45].map((y) => (
        <g key={y}>
          <rect x="12" y={y} width="20" height="2.5" rx="1" fill="#cbd5e1" />
          <rect x="46" y={y} width="12" height="2.5" rx="1" fill="#cbd5e1" />
        </g>
      ))}
      <rect x="10" y="52" width="52" height="1" fill="#e2e8f0" />
      <rect x="12" y="57" width="16" height="3" rx="1" fill="#475569" />
      <rect x="44" y="57" width="14" height="3" rx="1" fill="var(--da-primary, #2563eb)" opacity="0.85" />
    </>
  );
}

function Deed() {
  return (
    <>
      <rect x="18" y="10" width="36" height="4" rx="1" fill="var(--da-primary, #2563eb)" opacity="0.85" />
      <rect x="10" y="22" width="52" height="2" rx="1" fill="#cbd5e1" />
      <rect x="10" y="27" width="52" height="2" rx="1" fill="#cbd5e1" />
      <rect x="10" y="32" width="46" height="2" rx="1" fill="#cbd5e1" />
      <rect x="10" y="37" width="52" height="2" rx="1" fill="#cbd5e1" />
      <rect x="10" y="42" width="50" height="2" rx="1" fill="#cbd5e1" />
      <rect x="10" y="47" width="38" height="2" rx="1" fill="#cbd5e1" />
      <rect x="10" y="58" width="16" height="2" rx="1" fill="#94a3b8" />
      <rect x="46" y="58" width="16" height="2" rx="1" fill="#94a3b8" />
      <rect x="10" y="62" width="12" height="2" rx="1" fill="#e2e8f0" />
      <rect x="46" y="62" width="12" height="2" rx="1" fill="#e2e8f0" />
    </>
  );
}

const KINDS = { letter: Letter, certificate: Certificate, receipt: Receipt, deed: Deed };

export default function DocThumbnail({ slug }) {
  const Kind = KINDS[KIND_BY_SLUG[slug] || "letter"];
  return (
    <svg
      className="doc-thumb"
      viewBox="0 0 72 76"
      width="54"
      height="57"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="2" width="68" height="72" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      <Kind />
    </svg>
  );
}
