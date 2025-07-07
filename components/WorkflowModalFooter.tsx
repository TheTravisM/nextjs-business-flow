import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
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

function WorkflowModalFooter({
  currentStep,
  onBack,
  onNext,
  onSaveWorkflowDraft,
  onHandleSaveDraft,
  isStepValid,
  WORKFLOW_STEPS,
  isSaving,
}: WorkflowModalFooterProps) {

  const getCurrentStepName = useCallback(() => {
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
  }, [currentStep, WORKFLOW_STEPS]);

  const backButton = useMemo(() => {
    if (currentStep < WORKFLOW_STEPS.CRITERIA_TYPE) return null;

    const previousStep =
      currentStep === WORKFLOW_STEPS.CRITERIA_TYPE
        ? "Criteria"
        : currentStep === WORKFLOW_STEPS.TRIGGER
        ? "Criteria Type"
        : currentStep === WORKFLOW_STEPS.ACTION
        ? "Trigger"
        : "Action";

    return (
      <button
        className="button button--back"
        onClick={onBack}
        disabled={isSaving}
        aria-label={`Back to ${previousStep} step`}
        aria-describedby="back-button-description"
        type="button"
      >
        <ArrowBackOutlinedIcon />
        Back
        <span id="back-button-description" className="sr-only">
          Return to previous step of workflow creation
        </span>
      </button>
    );
  }, [currentStep, WORKFLOW_STEPS, onBack, isSaving]);

  const saveForLaterButton = useMemo(() => {
    if (currentStep < WORKFLOW_STEPS.TRIGGER) return null;

    return (
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
    );
  }, [currentStep, WORKFLOW_STEPS.TRIGGER, onSaveWorkflowDraft, isSaving]);

  const nextButton = useMemo(() => {
    if (currentStep >= WORKFLOW_STEPS.REVIEW) return null;

    const nextStep =
      currentStep === WORKFLOW_STEPS.CRITERIA
        ? "Criteria Type"
        : currentStep === WORKFLOW_STEPS.CRITERIA_TYPE
        ? "Trigger"
        : currentStep === WORKFLOW_STEPS.TRIGGER
        ? "Action"
        : "Review";

    return (
      <button
        className="button button--primary button--next"
        onClick={onNext}
        disabled={!isStepValid || isSaving}
        aria-label={`Next to ${nextStep} step`}
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
    );
  }, [currentStep, WORKFLOW_STEPS, onNext, isStepValid, isSaving]);

  const saveDraftButton = useMemo(() => {
    if (currentStep !== WORKFLOW_STEPS.REVIEW) return null;

    return (
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
    );
  }, [currentStep, WORKFLOW_STEPS.REVIEW, onHandleSaveDraft, isSaving]);

  const screenReaderAnnouncement = useMemo(
    () => (
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Currently on step {getCurrentStepName()}
        {isSaving && ", Saving workflow..."}
        {!isStepValid && ", Please complete all required fields to continue"}
      </div>
    ),
    [getCurrentStepName, isSaving, isStepValid]
  );

  return (
    <footer
      className="modal__footer"
      role="contentinfo"
      aria-label="Workflow navigation controls"
    >
      {screenReaderAnnouncement}

      {backButton}

      {saveForLaterButton}

      {nextButton}

      {saveDraftButton}
    </footer>
  );
}

WorkflowModalFooter.propTypes = {
  currentStep: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onSaveWorkflowDraft: PropTypes.func.isRequired,
  onHandleSaveDraft: PropTypes.func.isRequired,
  isStepValid: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  WORKFLOW_STEPS: PropTypes.shape({
    CRITERIA: PropTypes.number.isRequired,
    CRITERIA_TYPE: PropTypes.number.isRequired,
    TRIGGER: PropTypes.number.isRequired,
    ACTION: PropTypes.number.isRequired,
    REVIEW: PropTypes.number.isRequired
  }).isRequired
};

export default React.memo(WorkflowModalFooter);
