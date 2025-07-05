import { useState, useEffect } from 'react';
import { WORKFLOW_STEPS } from '../constants/workflowSteps';
import { saveWorkflowToStorage, loadWorkflowFromStorage, clearWorkflowFromStorage } from '../utils/workflowStorage';
import { WorkflowState } from '../types/workflow';
import { CriteriaTypeOptions } from '../components/steps/CriteriaType';
import { triggerOptions } from '../components/steps/Trigger';

export function useWorkflow() {
  // All state variables
  const [step, setStep] = useState(WORKFLOW_STEPS.CRITERIA);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [criteriaSelected, setCriteriaSelected] = useState<number | null>(null);
  const [criteriaTypeSelected, setCriteriaTypeSelected] = useState<boolean[]>(
    Array(8).fill(false)
  );
  const [triggerSelected, setTriggerSelected] = useState<number | null>(null);
  const [actionSelected, setActionSelected] = useState<boolean[]>([
    false, false, false
  ]);

  // Load saved data
  useEffect(() => {
    const savedData = loadWorkflowFromStorage();
    if (savedData) {
      setStep(savedData.step || WORKFLOW_STEPS.CRITERIA);
      setCriteriaSelected(savedData.criteriaSelected || null);
      setCriteriaTypeSelected(savedData.criteriaTypeSelected || Array(8).fill(false));
      setTriggerSelected(savedData.triggerSelected || null);
      setActionSelected(savedData.actionSelected || [false, false, false]);
    }
  }, []);

  // Reset state function
  const resetWorkflowState = () => {
    setStep(WORKFLOW_STEPS.CRITERIA);
    setCriteriaSelected(null);
    setCriteriaTypeSelected(Array(8).fill(false));
    setTriggerSelected(null);
    setActionSelected([false, false, false]);
  };

  // Save draft function
  const saveWorkflowDraft = () => {
    const workflowState: WorkflowState = {
      step,
      criteriaSelected,
      criteriaTypeSelected,
      triggerSelected,
      actionSelected,
    };
  
    const success = saveWorkflowToStorage(workflowState);
    
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
        return criteriaSelected !== null;
      case WORKFLOW_STEPS.CRITERIA_TYPE:
        return criteriaTypeSelected.some(Boolean);
      case WORKFLOW_STEPS.TRIGGER: 
        return triggerSelected !== null;
      case WORKFLOW_STEPS.ACTION: 
        return actionSelected.some(Boolean);
      default:
        return true;
    }
  };

  // Computed values
  const selectedCriteriaTypeLabels = CriteriaTypeOptions.filter(
    (_, idx) => criteriaTypeSelected[idx]
  ).map((option) => option.label);

  const selectedTriggerLabel =
    triggerSelected !== null ? triggerOptions[triggerSelected].label : "";

  // UI functions
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navigation functions
  const goToNextStep = () => setStep(step + 1);
  const goToPrevStep = () => setStep(step - 1);

  // Return everything needed by the component
  return {
    // State
    step,
    isModalOpen,
    criteriaSelected,
    criteriaTypeSelected,
    triggerSelected,
    actionSelected,
    
    // Setters
    setStep,
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
    goToPrevStep
  };
}