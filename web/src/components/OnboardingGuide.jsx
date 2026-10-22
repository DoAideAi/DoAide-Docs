import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ONBOARDING_KEY = "doaide_docs_onboarded";

export const STEPS = [
  { title: "Pick a document", text: "Choose from 19 free generators — rent receipts, salary slips, letters, invoices and more." },
  { title: "Fill in the form", text: "A live preview updates as you type. No login, and nothing is sent to a server." },
  { title: "Download or share", text: "Download a PDF instantly, or share the tool with a colleague on WhatsApp." },
];

function hasOnboarded() {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === "1";
  } catch {
    return false;
  }
}

function markOnboarded() {
  try {
    localStorage.setItem(ONBOARDING_KEY, "1");
  } catch {
    // storage unavailable (private mode) — the guide just shows again next visit
  }
}

export default function OnboardingGuide() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (pathname === "/" && !hasOnboarded()) setOpen(true);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    markOnboarded();
    setOpen(false);
  }

  if (!open) return null;

  const last = step === STEPS.length - 1;
  const { title, text } = STEPS[step];

  return (
    <div className="onboarding no-print" role="dialog" aria-modal="false" aria-labelledby="onboarding-title">
      <div className="onboarding-head">
        <span className="onboarding-count">Step {step + 1} of {STEPS.length}</span>
        <button className="onboarding-close" onClick={close} aria-label="Close guide">×</button>
      </div>
      <h2 id="onboarding-title">{title}</h2>
      <p>{text}</p>
      <div className="onboarding-actions">
        <button className="btn btn-secondary" onClick={close}>Skip</button>
        {step > 0 && (
          <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
        )}
        <button className="btn btn-primary" onClick={() => (last ? close() : setStep(step + 1))}>
          {last ? "Get started" : "Next"}
        </button>
      </div>
    </div>
  );
}
