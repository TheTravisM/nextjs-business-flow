import React, { useCallback, useMemo } from "react";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EmailIcon from "@mui/icons-material/Email";
import WebhookOutlinedIcon from "@mui/icons-material/WebhookOutlined";
import WebhookIcon from "@mui/icons-material/Webhook";

const options = [
  {
    label: "Add flag",
    outlined: <FlagOutlinedIcon />,
    filled: <FlagIcon />,
    description: "Flag items that meet the criteria",
  },
  {
    label: "Send Email",
    outlined: <EmailOutlinedIcon />,
    filled: <EmailIcon />,
    description: "Send email notifications when triggered",
  },
  {
    label: "Send webhook",
    outlined: <WebhookOutlinedIcon />,
    filled: <WebhookIcon />,
    description: "Send webhook data to external systems",
  },
];

interface ActionProps {
  selected: boolean[];
  setSelected: (val: boolean[]) => void;
}

export default function Action({ selected, setSelected }: ActionProps) {
  const handleOptionClick = useCallback(
    (idx: number): void => {
      const updated: boolean[] = [...selected];
      updated[idx] = !updated[idx];
      setSelected(updated);
    },
    [selected, setSelected]
  );

  const selectedCount = useMemo(
    () => selected.filter(Boolean).length,
    [selected]
  );

  return (
    <>
      <main
        id="action"
        className="modal__content content--action"
        role="main"
        aria-labelledby="action-title"
      >
        <h2 className="content__title" id="action-title">
          What should happen once the workflow begins?
        </h2>
        <p className="content__details" aria-describedby="action-title">
          Select at least 1 action to continue. You can add additional actions
          later
        </p>
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {selectedCount} of {options.length} actions selected
        </div>
        <section
          className="options options--action"
          role="group"
          aria-labelledby="action-title"
        >
          {options.map((option, idx) => (
            <div
              role="button"
              tabIndex={0}
              key={option.label}
              data-testid="option-item"
              className={`options__item${
                selected[idx] ? " options__item--selected" : ""
              }`}
              onClick={() => handleOptionClick(idx)}
              style={{ cursor: "pointer" }}
              aria-pressed={selected[idx]}
              aria-describedby={`action-description-${idx}`}
            >
              {selected[idx] ? option.filled : option.outlined}
              <span className="options__text">{option.label}</span>
              <span id={`action-description-${idx}`} className="sr-only">
                {option.description}.{" "}
                {selected[idx] ? "Selected" : "Not selected"}
              </span>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
