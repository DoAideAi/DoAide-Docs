// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import OnboardingGuide, { ONBOARDING_KEY, STEPS } from "./OnboardingGuide";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// jsdom without a URL has an opaque origin and no localStorage
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  clear: () => store.clear(),
};

let container, root;

function mount(path = "/") {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root.render(createElement(MemoryRouter, { initialEntries: [path] }, createElement(OnboardingGuide)));
  });
}

const button = (label) => [...container.querySelectorAll("button")].find((b) => b.textContent === label);

beforeEach(() => localStorage.clear());
afterEach(() => {
  if (root) act(() => root.unmount());
  container?.remove();
  root = container = undefined;
});

describe("OnboardingGuide", () => {
  it("renders nothing during prerender (no effects run)", () => {
    const html = renderToStaticMarkup(
      createElement(MemoryRouter, { initialEntries: ["/"] }, createElement(OnboardingGuide))
    );
    expect(html).toBe("");
  });

  it("shows on the first homepage visit and walks through every step", () => {
    mount("/");
    expect(container.textContent).toContain(STEPS[0].title);
    for (let i = 1; i < STEPS.length; i++) {
      act(() => button("Next").click());
      expect(container.textContent).toContain(STEPS[i].title);
    }
    act(() => button("Get started").click());
    expect(container.innerHTML).toBe("");
    expect(localStorage.getItem(ONBOARDING_KEY)).toBe("1");
  });

  it("does not show again once dismissed", () => {
    localStorage.setItem(ONBOARDING_KEY, "1");
    mount("/");
    expect(container.innerHTML).toBe("");
  });

  it("does not show on generator pages", () => {
    mount("/rent-receipt-generator");
    expect(container.innerHTML).toBe("");
  });

  it("closes on Escape", () => {
    mount("/");
    act(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })));
    expect(container.innerHTML).toBe("");
    expect(localStorage.getItem(ONBOARDING_KEY)).toBe("1");
  });
});
