import React, { useMemo } from "react";
import PropTypes from "prop-types";

interface ReviewProps {
  criteriaTypeSelections: string[];
  triggerSelection: string;
}

function Review({ criteriaTypeSelections, triggerSelection }: ReviewProps) {
  const triggerText = useMemo(
    () =>
      triggerSelection === "record created"
        ? "created"
        : triggerSelection === "record updated"
        ? "updated"
        : "processed",
    [triggerSelection]
  );

  const criteriaTypeList = useMemo(
    () => (
      <ul
        role="list"
        aria-label="Selected record types"
        aria-describedby="workflow-summary"
      >
        {criteriaTypeSelections.map((label) => (
          <li key={label} role="listitem" aria-describedby="workflow-summary">
            {label}
          </li>
        ))}
      </ul>
    ),
    [criteriaTypeSelections]
  );

  const summaryText = useMemo(
    () =>
      `Workflow summary: ${criteriaTypeSelections.length} record types selected for ${triggerText} trigger with flag action`,
    [criteriaTypeSelections.length, triggerText]
  );

  return (
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

        {criteriaTypeList}

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {summaryText}
        </div>
      </section>
    </main>
  );
}

Review.propTypes = {
  criteriaTypeSelections: PropTypes.arrayOf(PropTypes.string).isRequired,
  triggerSelection: PropTypes.string.isRequired
};

export default React.memo(Review);
