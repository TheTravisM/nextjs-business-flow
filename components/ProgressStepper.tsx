import React from "react";
import CheckIcon from "@mui/icons-material/Check";

interface ProgressStepperProps {
  step: number;
}

export default function ProgressStepper({ step }: ProgressStepperProps) {
  const getStepClass = (stepNumber: number) => {
    if (step > stepNumber) return " progress__step--success";
    if (step === stepNumber || (stepNumber <= 2 && step <= 2))
      return " progress__step--active";
    return "";
  };

  const getIconClass = (stepNumber: number) => {
    if (step > stepNumber) return " progress__icon--success";
    if (step === stepNumber || (stepNumber <= 2 && step <= 2))
      return " progress__icon--active";
    return "";
  };

  const getStepStatus = (stepNumber: number) => {
    if (step > stepNumber) return "completed";
    if (step === stepNumber || (stepNumber <= 2 && step <= 2)) return "current";
    return "upcoming";
  };

  const steps = [
    { number: 2, name: "Criteria", label: "Select workflow criteria" },
    { number: 3, name: "Trigger", label: "Choose trigger event" },
    { number: 4, name: "Action", label: "Define workflow actions" },
    { number: 5, name: "Review", label: "Review and finalize workflow" },
  ];

  return (
    <nav
      className="modal__progress-stepper progress"
      role="navigation"
      aria-label="Workflow creation progress"
    >
      <ol
        className="progress__list"
        role="list"
        aria-describedby="progress-description"
      >
        <div id="progress-description" className="sr-only">
          Step {step - 1} of {steps.length}: Progress through workflow creation
          steps
        </div>

        {steps.map((stepData) => (
          <li 
            key={stepData.name}
            className={`progress__step progress__step--${stepData.name.toLowerCase()}${getStepClass(stepData.number)}`}
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

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Currently on step {step - 1}:{" "}
        {steps.find((s) => s.number === step)?.name || "Unknown"}
      </div>
    </nav>
  );
}
