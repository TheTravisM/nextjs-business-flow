"use client";
import { useWorkflow } from "../hooks/useWorkflow";

import ProgressStepper from "../components/ProgressStepper";
import WorkflowModalFooter from "../components/WorkflowModalFooter";
import Criteria from "../components/steps/Criteria";
import CriteriaType from "../components/steps/CriteriaType";
import Trigger from "../components/steps/Trigger";
import Action from "../components/steps/Action";
import Review from "../components/steps/Review";

import CloseIcon from "@mui/icons-material/Close";
import { WORKFLOW_STEPS } from "../constants/workflowSteps";

export default function Home() {
  const workflow = useWorkflow();

  // loading check at the start of the app
  if (workflow.isLoading) {
    return (
      <main className="main" role="main" aria-label="Workflow application">
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading workflow data"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <div>Loading workflow...</div>
          <span className="sr-only">Please wait while the workflow loads</span>
        </div>
      </main>
    );
  }

  const renderStepComponent = (
    currentStep: number
  ): React.ReactElement | null => {
    switch (currentStep) {
      case WORKFLOW_STEPS.CRITERIA:
        return (
          <Criteria
            selected={workflow.criteriaSelected}
            setSelected={workflow.setCriteriaSelected}
          />
        );

      case WORKFLOW_STEPS.CRITERIA_TYPE:
        return (
          <CriteriaType
            selected={workflow.criteriaTypeSelected}
            setSelected={workflow.setCriteriaTypeSelected}
          />
        );

      case WORKFLOW_STEPS.TRIGGER:
        return (
          <Trigger
            selected={workflow.triggerSelected}
            setSelected={workflow.setTriggerSelected}
          />
        );

      case WORKFLOW_STEPS.ACTION:
        return (
          <Action
            selected={workflow.actionSelected}
            setSelected={workflow.setActionSelected}
          />
        );

      case WORKFLOW_STEPS.REVIEW:
        return (
          <Review
            criteriaTypeSelections={workflow.selectedCriteriaTypeLabels}
            triggerSelection={workflow.selectedTriggerLabel}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="main" role="main" aria-label="Workflow application">
      <dialog
        id="new-work-flow"
        className="modal"
        open={workflow.isModalOpen}
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        aria-modal="true"
      >
        <header className="modal__header">
          <h1 id="modal-title" className="modal__title">
            New Work Flow
          </h1>
          <button
            className="modal__close"
            aria-label="Close workflow modal"
            type="button"
            onClick={workflow.closeModal}
          >
            <CloseIcon aria-hidden="true" />
          </button>
        </header>

        {workflow.error && (
          <div
            role="alert"
            aria-live="assertive"
            id="error-message"
            style={{
              background: "#ffebee",
              color: "#c62828",
              padding: "12px",
              margin: "12px",
              borderRadius: "4px",
              border: "1px solid #ffcdd2",
            }}
          >
            {workflow.error}
          </div>
        )}

        <ProgressStepper
          step={workflow.step}
          aria-label="Workflow creation progress"
        />

        {renderStepComponent(workflow.step)}

        <WorkflowModalFooter
          currentStep={workflow.step}
          onBack={workflow.goToPrevStep}
          onNext={workflow.goToNextStep}
          onSaveWorkflowDraft={workflow.saveWorkflowDraft}
          onHandleSaveDraft={workflow.handleSaveDraft}
          isStepValid={workflow.isStepValid(workflow.step)}
          WORKFLOW_STEPS={WORKFLOW_STEPS}
          isSaving={workflow.isSaving}
        />
      </dialog>
    </main>
  );
}
