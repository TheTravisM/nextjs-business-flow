import React, { useState } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";

const options = [
  {
    label: "record created",
    outlined: <AddOutlinedIcon />,
    filled: <AddIcon />,
    description: "Trigger workflow when a new record is created",
  },
  {
    label: "record updated",
    outlined: <EditNoteOutlinedIcon />,
    filled: <EditNoteIcon />,
    description: "Trigger workflow when an existing record is updated",
  },
];

interface TriggerProps {
  selected: number | null;
  setSelected: (val: number | null) => void;
}

export default function Trigger({ selected, setSelected }: TriggerProps) {
  const handleOptionClick = (idx: number) => {
    setSelected(idx === selected ? null : idx);
  };

  return (
    <main
      id="trigger"
      className="modal__content"
      role="main"
      aria-labelledby="trigger-title"
    >
      <h2 id="trigger-title" className="content__title">
        What should trigger this workflow?
      </h2>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {selected !== null
          ? `${options[selected].label} trigger selected`
          : "No trigger selected"}
      </div>

      <section
        className="options options--trigger"
        role="radiogroup"
        aria-labelledby="trigger-title"
        aria-describedby="trigger-instructions"
      >
        {options.map((option, idx) => (
          <div
            role="radio"
            tabIndex={0}
            key={option.label}
            data-testid="option-item"
            className={
              "options__item" +
              (selected === idx ? " options__item--selected" : "")
            }
            onClick={() => handleOptionClick(idx)}
            aria-checked={selected === idx}
            aria-describedby={`trigger-description-${idx}`}
          >
            {selected === idx ? option.filled : option.outlined}
            <span className="options__text">{option.label}</span>

            <span id={`trigger-description-${idx}`} className="sr-only">
              {option.description}.{" "}
              {selected === idx ? "Selected" : "Not selected"}
            </span>
          </div>
        ))}

        {selected !== null && (
          <button
            className="button button--text button--add-condition"
            type="button"
            aria-describedby="add-condition-description"
          >
            + Add Condition
            <span id="add-condition-description" className="sr-only">
              Add additional conditions to refine when this workflow triggers
            </span>
          </button>
        )}
      </section>
    </main>
  );
}
export { options as triggerOptions };
