import { useState, useEffect } from "react";
import { WORKFLOW_STEPS } from "../constants/workflowSteps";
import {
  saveWorkflowToStorage,
  loadWorkflowFromStorage,
  clearWorkflowFromStorage,
} from "../utils/workflowStorage";
import { WorkflowState } from "../types/workflow";
import { CriteriaTypeOptions } from "../components/steps/CriteriaType";
import { triggerOptions } from "../components/steps/Trigger";

export function useWorkflow() {
  // All state variables
  const [workflowState, setWorkflowState] = useState({
    step: WORKFLOW_STEPS.CRITERIA,
    isModalOpen: true,
    criteriaSelected: null as number | null,
    criteriaTypeSelected: Array(8).fill(false) as boolean[],
    triggerSelected: null as number | null,
    actionSelected: [false, false, false] as boolean[],
  });

  const updateWorkflowState = (updates: Partial<typeof workflowState>) => {
    setWorkflowState((prev) => ({ ...prev, ...updates }));
  };

  const setCriteriaSelected = (value: number | null) =>
    updateWorkflowState({ criteriaSelected: value });

  const setCriteriaTypeSelected = (value: boolean[]) =>
    updateWorkflowState({ criteriaTypeSelected: value });

  const setTriggerSelected = (value: number | null) =>
    updateWorkflowState({ triggerSelected: value });

  const setActionSelected = (value: boolean[]) =>
    updateWorkflowState({ actionSelected: value });

  const setStep = (value: number) => updateWorkflowState({ step: value });

  // Load saved data
  useEffect(() => {
    const savedData = loadWorkflowFromStorage();
    if (savedData) {
      setWorkflowState({
        step: savedData.step || WORKFLOW_STEPS.CRITERIA,
        isModalOpen: true,
        criteriaSelected: savedData.criteriaSelected || null,
        criteriaTypeSelected:
          savedData.criteriaTypeSelected || Array(8).fill(false),
        triggerSelected: savedData.triggerSelected || null,
        actionSelected: savedData.actionSelected || [false, false, false],
      });
    }
  }, []);

  // Reset state function
  const resetWorkflowState = () => {
    setWorkflowState({
      step: WORKFLOW_STEPS.CRITERIA,
      isModalOpen: true,
      criteriaSelected: null,
      criteriaTypeSelected: Array(8).fill(false),
      triggerSelected: null,
      actionSelected: [false, false, false],
    });
  };

  // Save draft function
  const saveWorkflowDraft = () => {
    const workflowData: WorkflowState = {
      step: workflowState.step,
      criteriaSelected: workflowState.criteriaSelected,
      criteriaTypeSelected: workflowState.criteriaTypeSelected,
      triggerSelected: workflowState.triggerSelected,
      actionSelected: workflowState.actionSelected,
    };

    const success = saveWorkflowToStorage(workflowData);

    if (success) {
      alert("Workflow saved! You can continue later.");
    } else {
      alert("Failed to save workflow. Please try again.");
    }
  };

  // Handle save draft function
  const handleSaveDraft = () => {
    const success = clearWorkflowFromStorage();
    if (success) {
      alert("Workflow draft saved successfully!");
      resetWorkflowState();
    } else {
      alert("Failed to create workflow. Please try again.");
    }
  };

  // Validation logic
  const isStepValid = (currentStep: number) => {
    switch (currentStep) {
      case WORKFLOW_STEPS.CRITERIA:
        return workflowState.criteriaSelected !== null;
      case WORKFLOW_STEPS.CRITERIA_TYPE:
        return workflowState.criteriaTypeSelected.some(Boolean);
      case WORKFLOW_STEPS.TRIGGER:
        return workflowState.triggerSelected !== null;
      case WORKFLOW_STEPS.ACTION:
        return workflowState.actionSelected.some(Boolean);
      default:
        return true;
    }
  };

  // Computed values
  const selectedCriteriaTypeLabels = CriteriaTypeOptions.filter(
    (_, idx) => workflowState.criteriaTypeSelected[idx]
  ).map((option) => option.label);

  const selectedTriggerLabel =
    workflowState.triggerSelected !== null
      ? triggerOptions[workflowState.triggerSelected].label
      : "";

  // UI functions
  const closeModal = () => {
    updateWorkflowState({ isModalOpen: false });
  };

  // Navigation functions
  const goToNextStep = () =>
    updateWorkflowState({ step: workflowState.step + 1 });
  const goToPrevStep = () =>
    updateWorkflowState({ step: workflowState.step - 1 });

  // Return everything needed by the component

  return {
    // State values
    step: workflowState.step,
    isModalOpen: workflowState.isModalOpen,
    criteriaSelected: workflowState.criteriaSelected,
    criteriaTypeSelected: workflowState.criteriaTypeSelected,
    triggerSelected: workflowState.triggerSelected,
    actionSelected: workflowState.actionSelected,

    // Setters (these stay the same for your component)
    setCriteriaSelected,
    setCriteriaTypeSelected,
    setTriggerSelected,
    setActionSelected,

    // Computed values
    selectedCriteriaTypeLabels,
    selectedTriggerLabel,

    // Functions
    closeModal,
    saveWorkflowDraft,
    handleSaveDraft,
    resetWorkflowState,
    isStepValid,
    goToNextStep,
    goToPrevStep,
  };
}
