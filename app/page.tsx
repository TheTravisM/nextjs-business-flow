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

  const renderStepComponent = (currentStep: number): React.ReactElement | null => {
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
    <main className="main">
      <dialog id="new-work-flow" className="modal" open={workflow.isModalOpen}>
        <header className="modal__header">
          <h5 className="modal__title">New Work Flow</h5>
          <button className="modal__close" onClick={workflow.closeModal}>
            <CloseIcon />
          </button>
        </header>

        <ProgressStepper step={workflow.step} />

        {renderStepComponent(workflow.step)}

        <WorkflowModalFooter
          currentStep={workflow.step}
          onBack={workflow.goToPrevStep}
          onNext={workflow.goToNextStep}
          onSaveWorkflowDraft={workflow.saveWorkflowDraft}
          onHandleSaveDraft={workflow.handleSaveDraft}
          isStepValid={workflow.isStepValid(workflow.step)}
          WORKFLOW_STEPS={WORKFLOW_STEPS}
        />
      </dialog>
    </main>
  );
}