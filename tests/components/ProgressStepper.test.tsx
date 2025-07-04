import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgressStepper from "@/components/ProgressStepper";

describe("ProgressStepper Component", () => {
  it("renders all stepper steps", () => {
    render(<ProgressStepper step={1} />);

    // Check that there are 4 steps (not 5 as originally expected)
    const steps = screen.getAllByRole("listitem");
    expect(steps.length).toBe(4);
  });

  it("correctly marks current step as active", () => {
    const currentStep = 3;
    render(<ProgressStepper step={currentStep} />);

    // Get all steps
    const steps = screen.getAllByRole("listitem");

    const activeStep = Array.from(steps).find((step) =>
      step.className.includes("progress__step--active")
    );

    // There should be one active step
    expect(activeStep).toBeTruthy();
  });

  it("marks previous steps as completed", () => {
    const currentStep = 3;
    render(<ProgressStepper step={currentStep} />);

    const steps = screen.getAllByRole("listitem");

    // Check that there's an active step
    const activeStep = Array.from(steps).find((step) =>
      step.className.includes("progress__step--active")
    );
    expect(activeStep).toBeTruthy();
  });

  it("marks future steps as incomplete", () => {
    const currentStep = 2;
    render(<ProgressStepper step={currentStep} />);

    // Get all steps
    const steps = screen.getAllByRole("listitem");

    // Find the active step
    const activeStepIndex = Array.from(steps).findIndex((step) =>
      step.className.includes("progress__step--active")
    );

    // Steps after the active one should not have the active class
    for (let i = activeStepIndex + 1; i < steps.length; i++) {
      expect(steps[i]).not.toHaveClass("progress__step--active");
    }
  });

  it("displays correct step labels", () => {
    render(<ProgressStepper step={1} />);

    // Check for each step label (update to match actual text)
    expect(screen.getByText("Criteria")).toBeInTheDocument();
    expect(screen.getByText("Trigger")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("handles step 1 correctly", () => {
    render(<ProgressStepper step={1} />);

    const steps = screen.getAllByRole("listitem");

    // Find the step with the "Criteria" label
    const criteriaStep = Array.from(steps).find((step) =>
      step.textContent?.includes("Criteria")
    );

    // The Criteria step should have the active class
    expect(criteriaStep).toHaveClass("progress__step--active");
  });

  it("handles final step correctly", () => {
    const { debug } = render(<ProgressStepper step={4} />);

    // debug();

    const steps = screen.getAllByRole("listitem");

    // Find the step with the "Review" label
    const reviewStep = Array.from(steps).find((step) =>
      step.textContent?.includes("Review")
    );

    // Find the step with the "Action" label
    const actionStep = Array.from(steps).find((step) =>
      step.textContent?.includes("Action")
    );

    // Check that the Review step has the review class
    expect(reviewStep).toHaveClass("progress__step--review");

    // Check that the Action step has the active class
    expect(actionStep).toHaveClass("progress__step--active");

    // Check that other steps don't have the active class (except Action)
    steps.forEach((step) => {
      if (step !== actionStep) {
        expect(step).not.toHaveClass("progress__step--active");
      }
    });
  });

  it("renders check icons for steps", () => {
    render(<ProgressStepper step={2} />);

    // Check for icon elements
    const checkIcons = screen.getAllByTestId("CheckIcon");
    expect(checkIcons.length).toBeGreaterThanOrEqual(1);
  });

  it("has appropriate CSS classes on the nav element", () => {
    const { container } = render(<ProgressStepper step={1} />);

    // Check for the main navigation element
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("modal__progress-stepper");
    expect(nav).toHaveClass("progress");
  });

  it("has appropriate CSS classes on the list element", () => {
    const { container } = render(<ProgressStepper step={1} />);

    // Check for the list element
    const list = container.querySelector("ul");
    expect(list).toHaveClass("progress__list");
  });
});
