import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ShareButtons from "./ShareButtons";

const read = (rel) => readFileSync(new URL(rel, import.meta.url), "utf-8");

describe("ShareButtons", () => {
  it("renders a WhatsApp link with the encoded text and url", () => {
    const html = renderToStaticMarkup(
      createElement(ShareButtons, { text: "Try this:", url: "https://docs.doaide.com/" })
    );
    expect(html).toContain(
      `https://wa.me/?text=${encodeURIComponent("Try this: https://docs.doaide.com/")}`.replace(/&/g, "&amp;")
    );
    expect(html).toContain("Share on WhatsApp");
  });

  it("does not show a fabricated usage count", () => {
    const html = renderToStaticMarkup(
      createElement(ShareButtons, { text: "x", url: "https://docs.doaide.com/" })
    );
    expect(html).not.toMatch(/people used/i);
  });

  it("is used on the homepage, blog layout and compare page", () => {
    expect(read("../pages/HomePage.jsx")).toContain("<ShareButtons");
    expect(read("../pages/blog/BlogLayout.jsx")).toContain("<ShareButtons");
    expect(read("../pages/compare/VsCanvaTemplates.jsx")).toContain("<ShareButtons");
  });
});

describe("ReferralBanner", () => {
  it("has no fabricated user count", () => {
    expect(read("./ReferralBanner.jsx")).not.toMatch(/professionals use DoAide/);
  });
});
