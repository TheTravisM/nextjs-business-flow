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
  const [workflowState, setWorkflowState] = useState({
    step: WORKFLOW_STEPS.CRITERIA,
    isModalOpen: true,
    criteriaSelected: null as number | null,
    criteriaTypeSelected: Array(8).fill(false) as boolean[],
    triggerSelected: null as number | null,
    actionSelected: [false, false, false] as boolean[],
    isLoading: false,
    isSaving: false,
    error: null as string | null,
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

  useEffect(() => {
    const loadSavedWorkflow = async () => {
      // Start loading
      updateWorkflowState({
        isLoading: true,
        error: null,
      });

      try {
        const savedData = loadWorkflowFromStorage();

        if (savedData) {
          // Successfully loaded saved data
          setWorkflowState({
            step: savedData.step || WORKFLOW_STEPS.CRITERIA,
            isModalOpen: true,
            criteriaSelected: savedData.criteriaSelected || null,
            criteriaTypeSelected:
              savedData.criteriaTypeSelected || Array(8).fill(false),
            triggerSelected: savedData.triggerSelected || null,
            actionSelected: savedData.actionSelected || [false, false, false],
            isLoading: false,
            isSaving: false,
            error: null,
          });
        } else {
          // No saved data found - for new users
          updateWorkflowState({
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        // Handle any errors during loading
        console.error("Failed to load workflow data:", error);
        updateWorkflowState({
          isLoading: false,
          error: "Failed to load saved workflow data. Starting fresh.",
        });
      }
    };

    loadSavedWorkflow();
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
      isLoading: false,
      isSaving: false,
      error: null,
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

  const handleSaveDraft = async () => {
    // Start saving - show loading state
    updateWorkflowState({
      isSaving: true,
      error: null,
    });

    try {
      const success = clearWorkflowFromStorage();

      if (success) {
        alert("Workflow draft saved successfully!");
        resetWorkflowState(); // This will also clear isSaving and error
      } else {
        updateWorkflowState({
          isSaving: false,
          error: "Failed to create workflow. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error completing workflow:", error);
      updateWorkflowState({
        isSaving: false,
        error: "An unexpected error occurred while completing the workflow.",
      });
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

  return {
    // State values
    step: workflowState.step,
    isModalOpen: workflowState.isModalOpen,
    criteriaSelected: workflowState.criteriaSelected,
    criteriaTypeSelected: workflowState.criteriaTypeSelected,
    triggerSelected: workflowState.triggerSelected,
    actionSelected: workflowState.actionSelected,

    // Add these new loading and error states:
    isLoading: workflowState.isLoading,
    isSaving: workflowState.isSaving,
    error: workflowState.error,

    // Setters
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
