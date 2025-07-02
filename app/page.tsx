"use client";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import ProgressStepper from "../components/ProgressStepper";

import Criteria01 from "../components/steps/Criteria01";
import Criteria02 from "../components/steps/Criteria02";
import Trigger01 from "../components/steps/Trigger01";

export default function Home() {
  const [step, setStep] = useState(1);

  return (
    <main className="main">
      <dialog id="new-work-flow" className="modal" open>
        <header className="modal__header">
          <h5 className="modal__title">New Work Flow</h5>
          <button className="modal__close">
            <CloseIcon />
          </button>
        </header>

        <ProgressStepper step={step} />

        {/* Conditionally render criteria steps */}
        {step === 1 ? (
          <Criteria01 />
        ) : step === 2 ? (
          <Criteria02 />
        ) : step === 3 ? (
          <Trigger01 />
        ) : null}

        <footer className="modal__footer">
          {step >= 2 && (
            <button
              className="button button--back"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          {step >= 3 && (
            <button className="button button--finish-later">
              Save and Finish Later
            </button>
          )}
          {step < 5 && (
            <button
              className="button button--primary"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          )}
          {step === 5 && (
            <button id="save-btn" className="button button--primary" hidden>
              Save Draft
            </button>
          )}
        </footer>
      </dialog>
    </main>
  );
}
