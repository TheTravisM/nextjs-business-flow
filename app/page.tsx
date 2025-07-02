"use client";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import ProgressStepper from "../components/ProgressStepper";

import Criteria01 from "../components/steps/Criteria01";
import Criteria02 from "../components/steps/Criteria02";
import Trigger01 from "../components/steps/Trigger01";
import Action01 from "../components/steps/Action01";
import Review01 from "../components/steps/Review01";


export default function Home() {
  const [step, setStep] = useState(1);

  // Add selection state for Criteria02 options
  const [criteria02Selected, setCriteria02Selected] = useState<boolean[]>(Array(8).fill(false));


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
          <Criteria02 
            selected={criteria02Selected}
            setSelected={setCriteria02Selected}
          />
        ) : step === 3 ? (
          <Trigger01 />
        ) : step === 4 ? (
          <Action01 />
        ) : step === 5 ? (
          <Review01 />
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
              className="button button--primary button--next"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          )}
          {step === 5 && (
            <button id="save-btn" className="button button--primary button--save-draft" hidden>
              Save Draft
            </button>
          )}
        </footer>
      </dialog>
    </main>
  );
}
