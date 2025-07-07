import React, { useCallback, useMemo } from "react";
import CheckIcon from "@mui/icons-material/Check";

interface ProgressStepperProps {
  step: number;
}

const STEPS = [
  { number: 2, name: "Criteria", label: "Select workflow criteria" },
  { number: 3, name: "Trigger", label: "Choose trigger event" },
  { number: 4, name: "Action", label: "Define workflow actions" },
  { number: 5, name: "Review", label: "Review and finalize workflow" },
];

function ProgressStepper({ step }: ProgressStepperProps) {
  const getStepClass = useCallback(
    (stepNumber: number) => {
      if (step > stepNumber) return " progress__step--success";
      if (step === stepNumber || (stepNumber <= 2 && step <= 2))
        return " progress__step--active";
      return "";
    },
    [step]
  );

  const getIconClass = useCallback(
    (stepNumber: number) => {
      if (step > stepNumber) return " progress__icon--success";
      if (step === stepNumber || (stepNumber <= 2 && step <= 2))
        return " progress__icon--active";
      return "";
    },
    [step]
  );

  const getStepStatus = useCallback(
    (stepNumber: number) => {
      if (step > stepNumber) return "completed";
      if (step === stepNumber || (stepNumber <= 2 && step <= 2))
        return "current";
      return "upcoming";
    },
    [step]
  );

  const stepsList = useMemo(() => (
      <ol
        className="progress__list"
        role="list"
        aria-describedby="progress-description"
      >
        <div id="progress-description" className="sr-only">
          Step {step - 1} of {STEPS.length}: Progress through workflow creation
          steps
        </div>

        {STEPS.map((stepData) => (
          <li
            key={stepData.name}
            className={`progress__step progress__step--${stepData.name.toLowerCase()}${getStepClass(
              stepData.number
            )}`}
            role="listitem"
          >
            <div
              className={`progress__icon${getIconClass(stepData.number)}`}
              role="img"
              aria-label={`Step ${stepData.number}: ${
                stepData.name
              } - ${getStepStatus(stepData.number)}`}
            >
              <CheckIcon aria-hidden="true" />
            </div>
            <span
              className="progress__label"
              aria-describedby={`step-${stepData.number}-description`}
            >
              {stepData.name}
            </span>
            <span
              id={`step-${stepData.number}-description`}
              className="sr-only"
            >
              {stepData.label}. Status: {getStepStatus(stepData.number)}
            </span>
          </li>
        ))}
      </ol>
    ),
    [step, getStepClass, getIconClass, getStepStatus]
  );

  return (
    <nav
      className="modal__progress-stepper progress"
      role="navigation"
      aria-label="Workflow creation progress"
    >
      {stepsList}

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Currently on step {step - 1}:{" "}
        {STEPS.find((s) => s.number === step)?.name || "Unknown"}
      </div>
    </nav>
  );
}

export default React.memo(ProgressStepper);