import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";

const css = readFileSync(new URL("./index.css", import.meta.url), "utf-8");

describe("touch targets", () => {
  it("never sets a min-height below 48px", () => {
    const heights = [...css.matchAll(/min-height:\s*(\d+)px/g)].map((m) => Number(m[1]));
    expect(heights.length).toBeGreaterThan(0);
    for (const h of heights.filter((h) => h < 100)) expect(h).toBeGreaterThanOrEqual(48);
  });

  it("has a 48px rule for buttons on touch/small screens", () => {
    expect(css).toMatch(/@media \(pointer: coarse\), \(max-width: 768px\)[^}]*button[^}]*min-height: 48px;\s*min-width: 48px;/s);
  });

  it("referral banner controls are 48px", () => {
    const src = readFileSync(new URL("./components/ReferralBanner.jsx", import.meta.url), "utf-8");
    expect(src.match(/minHeight: "48px"/g).length).toBeGreaterThanOrEqual(2);
  });
});
