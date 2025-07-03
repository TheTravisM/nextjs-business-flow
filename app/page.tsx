"use client";
import { useState, useEffect } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [criteria01Selected, setCriteria01Selected] = useState<number | null>(null);
  const [criteria02Selected, setCriteria02Selected] = useState<boolean[]>(
    Array(8).fill(false)
  );
  const [triggerSelected, setTriggerSelected] = useState<number | null>(null);
  const [actionSelected, setActionSelected] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

    // Load saved data on component mount
    useEffect(() => {
      try {
        const savedWorkflow = localStorage.getItem('workflow-draft');
        if (savedWorkflow) {
          const data = JSON.parse(savedWorkflow);
          setStep(data.step || 1);
          setCriteria01Selected(data.criteria01Selected || null);
          setCriteria02Selected(data.criteria02Selected || Array(8).fill(false));
          setTriggerSelected(data.triggerSelected || null);
          setActionSelected(data.actionSelected || [false, false, false]);
        }
      } catch (error) {
        console.error('Failed to load saved workflow:', error);
        localStorage.removeItem('workflow-draft'); // Clear corrupted data
      }
    }, []);

    // Save current state
    const saveWorkflowDraft = () => {
      try {
        const workflowData = {
          step,
          criteria01Selected,
          criteria02Selected,
          triggerSelected,
          actionSelected,
          savedAt: new Date().toISOString()
        };
        
        localStorage.setItem('workflow-draft', JSON.stringify(workflowData));
        alert('Workflow saved! You can continue later.');
      } catch (error) {
        console.error('Failed to save workflow:', error);
        alert('Failed to save workflow. Please try again.');
      }
    };

  // Filter selected labels for Review01
  const selectedCriteria02Labels = criteria02Options
    .filter((_, idx) => criteria02Selected[idx])
    .map((option) => option.label);

  const selectedTriggerLabel =
    triggerSelected !== null ? triggerOptions[triggerSelected].label : "";

      const closeModal = () => {
    setIsModalOpen(false);
  };

    const isStepValid = (currentStep: number) => {
      switch (currentStep) {
        case 1: return criteria01Selected !== null;
        case 2: return criteria02Selected.some(Boolean);
        case 3: return triggerSelected !== null;
        case 4: return actionSelected.some(Boolean);
        default: return true;
      }
    };

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
      <dialog id="new-work-flow" className="modal" open={isModalOpen}>
        <header className="modal__header">
          <h5 className="modal__title">New Work Flow</h5>
          <button className="modal__close" onClick={closeModal}>
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
            <button
              className="button button--finish-later"
              onClick={saveWorkflowDraft}
            >
              Save and Finish Later
            </button>
          )}
          {step < 5 && (
              <button
                className="button button--primary button--next"
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid(step)}
              >
                Next
              </button>
          )}
          {step === 5 && (
            <button
              id="save-btn"
              className="button button--primary button--save-draft"
              onClick={() => {
                localStorage.removeItem("workflow-draft"); // Clear draft
                alert("Workflow draft saved successfully!");
                setStep(1);
                setCriteria01Selected(null);
                setCriteria02Selected(Array(8).fill(false));
                setTriggerSelected(null);
                setActionSelected([false, false, false]);
              }}
            >
              Save Draft
            </button>
          )}
        </footer>
      </dialog>
    </main>
  );
}
