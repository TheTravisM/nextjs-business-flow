import React from "react";

interface ReviewProps {
  criteriaTypeSelections: string[];
  triggerSelection: string;
}

export default function Review({
  criteriaTypeSelections,
  triggerSelection,
}: ReviewProps) {
  const triggerText =
    triggerSelection === "record created"
      ? "created"
      : triggerSelection === "record updated"
      ? "updated"
      : "processed";

  return (
    <>
      <main
        id="review"
        className="modal__content content--review"
        role="main"
        aria-labelledby="review-title"
      >
        <h2 id="review-title" className="content__title">
          Review your workflow below. Click a step to make edits if needed.
        </h2>

        <section
          className="content__well"
          role="region"
          aria-labelledby="review-title"
          aria-describedby="workflow-summary"
        >
          <p id="workflow-summary" aria-live="polite">
            When any of the following record types is {triggerText}, add a flag.
          </p>

          <ul
            role="list"
            aria-label="Selected record types"
            aria-describedby="workflow-summary"
          >
            {criteriaTypeSelections.map((label) => (
              <li
                key={label}
                role="listitem"
                aria-describedby="workflow-summary"
              >
                {label}
              </li>
            ))}
          </ul>

          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Workflow summary: {criteriaTypeSelections.length} record types
            selected for {triggerText} trigger with flag action
          </div>
        </section>
      </main>
    </>
  );
}
