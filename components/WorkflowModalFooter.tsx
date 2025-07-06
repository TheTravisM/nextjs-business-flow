import React from "react";
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
  const getCurrentStepName = () => {
    switch (currentStep) {
      case WORKFLOW_STEPS.CRITERIA:
        return "Criteria";
      case WORKFLOW_STEPS.CRITERIA_TYPE:
        return "Criteria Type";
      case WORKFLOW_STEPS.TRIGGER:
        return "Trigger";
      case WORKFLOW_STEPS.ACTION:
        return "Action";
      case WORKFLOW_STEPS.REVIEW:
        return "Review";
      default:
        return "Unknown";
    }
  };

  return (
    <footer
      className="modal__footer"
      role="contentinfo"
      aria-label="Workflow navigation controls"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Currently on step {getCurrentStepName()}
        {isSaving && ", Saving workflow..."}
        {!isStepValid && ", Please complete all required fields to continue"}
      </div>

      {currentStep >= WORKFLOW_STEPS.CRITERIA_TYPE && (
        <button
          className="button button--back"
          onClick={onBack}
          disabled={isSaving}
          aria-label={`Back to ${
            currentStep === WORKFLOW_STEPS.CRITERIA_TYPE
              ? "Criteria"
              : currentStep === WORKFLOW_STEPS.TRIGGER
              ? "Criteria Type"
              : currentStep === WORKFLOW_STEPS.ACTION
              ? "Trigger"
              : "Action"
          } step`}
          aria-describedby="back-button-description"
          type="button"
        >
          <ArrowBackOutlinedIcon />
          Back
          <span id="back-button-description" className="sr-only">
            Return to previous step of workflow creation
          </span>
        </button>
      )}

      {currentStep >= WORKFLOW_STEPS.TRIGGER && (
        <button
          className="button button--finish-later"
          onClick={onSaveWorkflowDraft}
          disabled={isSaving}
          aria-describedby="save-later-description"
          type="button"
        >
          {isSaving ? "Saving..." : "Save and Finish Later"}
          <span id="save-later-description" className="sr-only">
            Save your progress and complete the workflow later
          </span>
        </button>
      )}

      {currentStep < WORKFLOW_STEPS.REVIEW && (
        <button
          className="button button--primary button--next"
          onClick={onNext}
          disabled={!isStepValid || isSaving}
          aria-label={`Next to ${
            currentStep === WORKFLOW_STEPS.CRITERIA
              ? "Criteria Type"
              : currentStep === WORKFLOW_STEPS.CRITERIA_TYPE
              ? "Trigger"
              : currentStep === WORKFLOW_STEPS.TRIGGER
              ? "Action"
              : "Review"
          } step`}
          aria-describedby={
            !isStepValid ? "next-disabled-description" : "next-description"
          }
          type="button"
        >
          Next
          <span id="next-description" className="sr-only">
            Proceed to next step of workflow creation
          </span>
          {!isStepValid && (
            <span id="next-disabled-description" className="sr-only">
              Please complete all required fields to continue
            </span>
          )}
        </button>
      )}

      {currentStep === WORKFLOW_STEPS.REVIEW && (
        <button
          id="save-btn"
          className="button button--primary button--save-draft"
          onClick={onHandleSaveDraft}
          disabled={isSaving}
          aria-describedby="save-description"
          type="button"
        >
          {isSaving ? "Saving..." : "Save Draft"}
          <span id="save-description" className="sr-only">
            Complete workflow creation and save as draft
          </span>
        </button>
      )}
    </footer>
  );
}
