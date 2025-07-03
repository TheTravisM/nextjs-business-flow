import React from "react";
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EmailIcon from '@mui/icons-material/Email';
import WebhookOutlinedIcon from '@mui/icons-material/WebhookOutlined';
import WebhookIcon from '@mui/icons-material/Webhook';

const options = [
  {
    label: "Add flag",
    outlined: <FlagOutlinedIcon />,
    filled: <FlagIcon />,
  },
  {
    label: "Send Email",
    outlined: <EmailOutlinedIcon />,
    filled: <EmailIcon />,
  },
  {
    label: "Send webhook",
    outlined: <WebhookOutlinedIcon />,
    filled: <WebhookIcon />,
  },
];

interface Action01Props {
  selected: boolean[];
  setSelected: (val: boolean[]) => void;
}

export default function Action01({ selected, setSelected }: Action01Props) {
  const handleOptionClick = (idx: number) => {
    const updated = [...selected];
    updated[idx] = !updated[idx];
    setSelected(updated);
  };

  return (
    <>
    <main id="action" className="modal__content content--action">
      <h2 className="content__title">
        What should happen once the workflow begins?
      </h2>
      <p className="content__details">
        Select at least 1 action to continue. You can add additional actions later
      </p>
      <section className="options options--action">
        {options.map((option, idx) => (
          <div
            key={option.label}
            className={`options__item${selected[idx] ? " options__item--selected" : ""}`}
            onClick={() => handleOptionClick(idx)}
            style={{ cursor: "pointer" }}
          >
            {selected[idx] ? option.filled : option.outlined}
            <span className="options__text">{option.label}</span>
          </div>
        ))}
      </section>
    </main>
    </>
  );
}
