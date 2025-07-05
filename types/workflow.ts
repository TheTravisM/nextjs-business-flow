export interface WorkflowState {
  step: number;
  criteriaSelected: number | null;
  criteriaTypeSelected: boolean[];
  triggerSelected: number | null;
  actionSelected: boolean[];
}

export type StepComponent = React.FC<{
  selected: any;
  setSelected: (value: any) => void;
}>;

export type ReviewComponent = React.FC<{
  criteriaTypeSelections: string[];
  triggerSelection: string;
}>;

export interface CriteriaProps {
  selected: number | null;
  setSelected: (value: number | null) => void;
}

export interface CriteriaTypeProps {
  selected: boolean[];
  setSelected: (value: boolean[]) => void;
}

export interface TriggerProps {
  selected: number | null;
  setSelected: (value: number | null) => void;
}

export interface ActionProps {
  selected: boolean[];
  setSelected: (value: boolean[]) => void;
}

export interface ReviewProps {
  criteriaTypeSelections: string[];
  triggerSelection: string;
}