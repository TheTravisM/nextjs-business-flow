export interface WorkflowData {
  step: number;
  criteriaSelected: number | null;
  criteriaTypeSelected: boolean[];
  triggerSelected: number | null;
  actionSelected: boolean[];
  savedAt: string;
}

export const saveWorkflowToStorage = (workflowData: Omit<WorkflowData, 'savedAt'>): boolean => {
  try {
    const dataWithTimestamp = {
      ...workflowData,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("workflow-draft", JSON.stringify(dataWithTimestamp));
    return true;
  } catch (error) {
    console.error("Failed to save workflow:", error);
    return false;
  }
};

export const loadWorkflowFromStorage = (): WorkflowData | null => {
  try {
    const savedWorkflow = localStorage.getItem("workflow-draft");
    if (savedWorkflow) {
      return JSON.parse(savedWorkflow);
    }
    return null;
  } catch (error) {
    console.error("Failed to load saved workflow:", error);
    localStorage.removeItem("workflow-draft"); // Clear corrupted data
    return null;
  }
};

export const clearWorkflowFromStorage = (): boolean => {
  try {
    localStorage.removeItem("workflow-draft");
    return true;
  } catch (error) {
    console.error("Failed to clear workflow:", error);
    return false;
  }
};