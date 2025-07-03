import React from "react";

interface ReviewProps {
  criteriaTypeSelections: string[];
  triggerSelection: string;
}

export default function Review({ criteriaTypeSelections, triggerSelection}: ReviewProps) {
  
  const triggerText = triggerSelection === "record created" 
    ? "created" 
    : triggerSelection === "record updated" 
    ? "updated" 
    : "processed";

  return (
    <>
        <main id="review" className="modal__content content--review">
          <h2 className="content__title">
            Review your workflow below. Click a step to make edits if needed.
          </h2>

      <section className="content__well">
        <p>When any of the following record types is {triggerText}, add a flag.</p>
        <ul>
          {criteriaTypeSelections.map(label => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </section>
        </main>
    </>
  );
}
