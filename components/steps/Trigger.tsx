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
  },
  {
    label: "record updated",
    outlined: <EditNoteOutlinedIcon />,
    filled: <EditNoteIcon />,
  },
];

interface TriggerProps {
  selected: number | null;
  setSelected: (val: number | null) => void;
}

export default function Trigger({
  selected,setSelected,}: TriggerProps) {
    
  const handleOptionClick = (idx: number) => {
    setSelected(idx);
  };

  return (
    <main id="trigger" className="modal__content">
      <h2 className="content__title">What should trigger this workflow?</h2>
      <section className="options options--criteria-01">
        {options.map((option, idx) => (
          <div
            key={option.label}
            className={
              "options__item" +
              (selected === idx ? " options__item--selected" : "")
            }
            onClick={() => handleOptionClick(idx)}
            style={{ cursor: "pointer" }}
          >
            {selected === idx ? option.filled : option.outlined}
            <span className="options__text">{option.label}</span>
          </div>
        ))}
        {selected !== null && (
          <button className="button button--text button--add-condition">
            + Add Condition
          </button>
        )}
      </section>
    </main>
  );
}
export { options as triggerOptions };