import React from 'react';
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

interface WorkflowModalFooterProps {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  onSaveWorkflowDraft: () => void;
  onHandleSaveDraft: () => void;
  isStepValid: boolean;
  isSaving: boolean;
  WORKFLOW_STEPS: {
    CRITERIA: number;
    CRITERIA_TYPE: number;
    TRIGGER: number;
    ACTION: number;
    REVIEW: number;
  };
}

export default function WorkflowModalFooter({
  currentStep,
  onBack,
  onNext,
  onSaveWorkflowDraft,
  onHandleSaveDraft,
  isStepValid,
  WORKFLOW_STEPS,
  isSaving, 
}: WorkflowModalFooterProps) {
  return (
    <footer className="modal__footer">
      {currentStep >= WORKFLOW_STEPS.CRITERIA_TYPE && (
        <button
          className="button button--back"
          onClick={onBack}
          disabled={isSaving}
        >
          <ArrowBackOutlinedIcon />
          Back
        </button>
      )}
      {currentStep >= WORKFLOW_STEPS.TRIGGER && (
        <button
          className="button button--finish-later"
          onClick={onSaveWorkflowDraft}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save and Finish Later"} 
        </button>
      )}
      {currentStep < WORKFLOW_STEPS.REVIEW && (
        <button
          className="button button--primary button--next"
          onClick={onNext}
          disabled={!isStepValid || isSaving}
        >
          Next
        </button>
      )}
      {currentStep === WORKFLOW_STEPS.REVIEW && (
        <button
          id="save-btn"
          className="button button--primary button--save-draft"
          onClick={onHandleSaveDraft}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Draft"}
        </button>
      )}
    </footer>
  );
}