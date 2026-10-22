import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const pagesDir = path.resolve(import.meta.dirname, ".");
const componentsDir = path.resolve(import.meta.dirname, "../components");

const NEW_GENERATORS = [
  ["CharacterCertificateGenerator.jsx", "character-certificate-generator"],
  ["IncrementLetterGenerator.jsx", "increment-letter-generator"],
  ["PromotionLetterGenerator.jsx", "promotion-letter-generator"],
  ["AddressProofLetterGenerator.jsx", "address-proof-letter-generator"],
];

for (const [file, slug] of NEW_GENERATORS) {
  describe(file.replace(".jsx", ""), () => {
    const src = fs.readFileSync(path.join(pagesDir, file), "utf8");

    it(`uses slug ${slug}`, () => {
      expect(src).toContain(`const SLUG = "${slug}"`);
    });

    it("has SeoHead with slug and FAQs", () => {
      expect(src).toContain("<SeoHead");
      expect(src).toContain("slug={SLUG}");
      expect(src).toContain("faqs={FAQS}");
    });

    it("includes ConversionCTA", () => {
      expect(src).toContain("<ConversionCTA");
    });

    it("includes ShareButtons with WhatsApp", () => {
      expect(src).toContain("<ShareButtons");
      expect(src).toContain("btn-whatsapp");
    });

    it("has at least 5 FAQ items", () => {
      const faqMatches = src.match(/\{\s*\n?\s*q: "/g);
      expect(faqMatches.length).toBeGreaterThanOrEqual(5);
    });

    it("uses addParagraph for body text in renderPdf", () => {
      const renderSection = src.slice(src.indexOf("function renderPdf"));
      expect(renderSection).toContain("ctx.addParagraph(");
    });

    it("includes Download PDF and Print actions", () => {
      expect(src).toContain("Download PDF");
      expect(src).toContain("printPreview");
    });
  });
}

describe("IncrementLetterGenerator specifics", () => {
  const src = fs.readFileSync(path.join(pagesDir, "IncrementLetterGenerator.jsx"), "utf8");

  it("calculates increment percentage from old and new salary", () => {
    expect(src).toContain("incrementPct");
    expect(src).toContain("oldSalary");
    expect(src).toContain("newSalary");
  });

  it("formats amounts in Indian notation", () => {
    expect(src).toContain('toLocaleString("en-IN")');
  });
});

describe("CharacterCertificateGenerator specifics", () => {
  const src = fs.readFileSync(path.join(pagesDir, "CharacterCertificateGenerator.jsx"), "utf8");

  it("supports school, employer, and society issuers", () => {
    expect(src).toContain('"school"');
    expect(src).toContain('"employer"');
    expect(src).toContain('"society"');
  });

  it("has conduct rating options", () => {
    expect(src).toContain('"Excellent"');
    expect(src).toContain('"Satisfactory"');
  });
});

describe("AddressProofLetterGenerator specifics", () => {
  const src = fs.readFileSync(path.join(pagesDir, "AddressProofLetterGenerator.jsx"), "utf8");

  it("supports employer, landlord, and society issuers", () => {
    expect(src).toContain('"employer"');
    expect(src).toContain('"landlord"');
    expect(src).toContain('"society"');
  });

  it("includes KYC purposes", () => {
    expect(src).toContain("Bank Account / KYC");
    expect(src).toContain("SIM Card / Telecom");
  });
});

describe("DocThumbnail", () => {
  const src = fs.readFileSync(path.join(componentsDir, "DocThumbnail.jsx"), "utf8");

  it("exports a default component", () => {
    expect(src).toContain("export default function DocThumbnail");
  });

  it("renders an svg with the doc-thumb class", () => {
    expect(src).toContain('className="doc-thumb"');
    expect(src).toContain("<svg");
  });

  it("has distinct layouts for letter, certificate, receipt, and deed", () => {
    for (const kind of ["letter", "certificate", "receipt", "deed"]) {
      expect(src).toContain(`${kind}:`);
    }
  });

  it("is used on the homepage cards", () => {
    const home = fs.readFileSync(path.join(pagesDir, "HomePage.jsx"), "utf8");
    expect(home).toContain("<DocThumbnail slug={doc.slug} />");
  });
});

describe("NOC blog post", () => {
  const postPath = path.join(pagesDir, "blog/posts/online-noc-generator-india.md");

  it("exists with the right slug", () => {
    const src = fs.readFileSync(postPath, "utf8");
    expect(src).toContain("slug: online-noc-generator-india");
  });

  it("links to the NOC generator and has FAQs", () => {
    const src = fs.readFileSync(postPath, "utf8");
    expect(src).toContain("(/noc-letter-generator)");
    expect(src).toContain("## Frequently Asked Questions");
  });
});
