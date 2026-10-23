import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const pagesDir = path.resolve(import.meta.dirname, ".");

describe("RecommendationLetterGenerator", () => {
  const src = fs.readFileSync(path.join(pagesDir, "RecommendationLetterGenerator.jsx"), "utf8");

  it('uses slug recommendation-letter-generator', () => {
    expect(src).toContain('const SLUG = "recommendation-letter-generator"');
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

  it("supports employment, academic, and character letter types", () => {
    expect(src).toContain('"employment"');
    expect(src).toContain('"academic"');
    expect(src).toContain('"character"');
  });

  it("has recommender details fields", () => {
    expect(src).toContain("recommenderName");
    expect(src).toContain("recommenderDesignation");
    expect(src).toContain("recommenderOrg");
    expect(src).toContain("recommenderRelation");
  });

  it("generates different body text based on letter type", () => {
    expect(src).toContain("isEmployment");
    expect(src).toContain("isAcademic");
    expect(src).toContain("function bodyText()");
  });
});

describe("RecommendationLetterGenerator route", () => {
  const appSrc = fs.readFileSync(path.join(pagesDir, "../App.jsx"), "utf8");

  it("is registered in App.jsx", () => {
    expect(appSrc).toContain('"/recommendation-letter-generator"');
    expect(appSrc).toContain("RecommendationLetterGenerator");
  });
});

describe("RecommendationLetterGenerator on homepage", () => {
  const homeSrc = fs.readFileSync(path.join(pagesDir, "HomePage.jsx"), "utf8");

  it("is listed in the DOCS array", () => {
    expect(homeSrc).toContain('"recommendation-letter-generator"');
    expect(homeSrc).toContain("Recommendation Letter");
  });
});

describe("RecommendationLetterGenerator in sitemap", () => {
  const sitemapSrc = fs.readFileSync(
    path.resolve(pagesDir, "../../public/sitemap.xml"),
    "utf8"
  );

  it("has a sitemap entry", () => {
    expect(sitemapSrc).toContain(
      "https://docs.doaide.com/recommendation-letter-generator"
    );
  });
});

describe("HR document templates blog post", () => {
  const postPath = path.join(pagesDir, "blog/posts/hr-document-templates-india.md");

  it("exists with the right slug", () => {
    const src = fs.readFileSync(postPath, "utf8");
    expect(src).toContain("slug: hr-document-templates-india");
  });

  it("links to relevant generators and has FAQs", () => {
    const src = fs.readFileSync(postPath, "utf8");
    expect(src).toContain("(/experience-letter-generator)");
    expect(src).toContain("(/offer-letter-generator)");
    expect(src).toContain("## Frequently Asked Questions");
  });

  it("is in the sitemap", () => {
    const sitemapSrc = fs.readFileSync(
      path.resolve(pagesDir, "../../public/sitemap.xml"),
      "utf8"
    );
    expect(sitemapSrc).toContain(
      "https://docs.doaide.com/blog/hr-document-templates-india"
    );
  });
});
