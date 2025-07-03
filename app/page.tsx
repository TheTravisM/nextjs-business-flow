"use client";
import { use, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ProgressStepper from "../components/ProgressStepper";
import Criteria01 from "../components/steps/Criteria01";
import Criteria02 from "../components/steps/Criteria02";
import { criteria02Options } from "../components/steps/Criteria02";
import Trigger01 from "../components/steps/Trigger01";
import { triggerOptions } from "../components/steps/Trigger01";
import Action01 from "../components/steps/Action01";
import Review01 from "../components/steps/Review01";

export default function Home() {
  const [step, setStep] = useState(1);

  const [criteria01Selected, setCriteria01Selected] = useState<number | null>(
    null
  );
  const [criteria02Selected, setCriteria02Selected] = useState<boolean[]>(
    Array(8).fill(false)
  );
  const [triggerSelected, setTriggerSelected] = useState<number | null>(null);
  const [actionSelected, setActionSelected] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  // Filter selected labels for Review01
  const selectedCriteria02Labels = criteria02Options
    .filter((_, idx) => criteria02Selected[idx])
    .map((option) => option.label);

  const selectedTriggerLabel =
    triggerSelected !== null ? triggerOptions[triggerSelected].label : "";

  const stepComponents: Record<number, React.ReactElement> = {
    1: (
      <Criteria01
        selected={criteria01Selected}
        setSelected={setCriteria01Selected}
      />
    ),
    2: (
      <Criteria02
        selected={criteria02Selected}
        setSelected={setCriteria02Selected}
      />
    ),
    3: (
      <Trigger01 
        selected={triggerSelected} 
        setSelected={setTriggerSelected}
      />
    ),
    4: <Action01 
        selected={actionSelected} 
        setSelected={setActionSelected}
        />,
    5: (
      <Review01
        criteria02Selections={selectedCriteria02Labels}
        triggerSelection={selectedTriggerLabel}
      />
    ),
  };

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

        {stepComponents[step] || null}

        <footer className="modal__footer">
          {step >= 2 && (
            <button
              className="button button--back"
              onClick={() => setStep(step - 1)}
            >
              <ArrowBackOutlinedIcon />
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
              disabled={
                (step === 1 && criteria01Selected === null) || // Criteria01: no selection
                (step === 2 && !criteria02Selected.some(Boolean)) || // Criteria02: no options selected
                (step === 3 && triggerSelected === null) || // Trigger01: no selection
                (step === 4 && !actionSelected.some(Boolean)) // Action01: no actions selected
              }
            >
              Next
            </button>
          )}
          {step === 5 && (
            <button
              id="save-btn"
              className="button button--primary button--save-draft"
              hidden
            >
              Save Draft
            </button>
          )}
        </footer>
      </dialog>
    </main>
  );
}
