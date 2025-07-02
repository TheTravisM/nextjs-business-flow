import React from "react";

interface ProgressStepperProps {
  step: number;
}

export default function ProgressStepper({ step }: ProgressStepperProps) {
  const getStepClass = (stepNumber: number) => {
    if (step > stepNumber) return " progress__step--successd";
    if (step === stepNumber || (stepNumber <= 2 && step <= 2)) return " progress__step--active";
    return "";
  };

  const getIconClass = (stepNumber: number) => {
    if (step > stepNumber) return " progress__icon--success";
    if (step === stepNumber || (stepNumber <= 2 && step <= 2)) return " progress__icon--active";
    return "";
  };

  return (
    <nav className="modal__progress-stepper progress">
      <ul className="progress__list">
        <li className={`progress__step progress__step--criteria${getStepClass(2)}`}>
          <div className={`progress__icon${getIconClass(2)}`}></div>
          <span className="progress__label">Criteria</span>
        </li>
        <li className={`progress__step progress__step--trigger${getStepClass(3)}`}>
          <div className={`progress__icon${getIconClass(3)}`}></div>
          <span className="progress__label">Trigger</span>
        </li>
        <li className={`progress__step progress__step--action${getStepClass(4)}`}>
          <div className={`progress__icon${getIconClass(4)}`}></div>
          <span className="progress__label">Action</span>
        </li>
        <li className={`progress__step progress__step--review${getStepClass(5)}`}>
          <div className={`progress__icon${getIconClass(5)}`}></div>
          <span className="progress__label">Review</span>
        </li>
      </ul>
    </nav>
  );
}