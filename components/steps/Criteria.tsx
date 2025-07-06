import React, { useState } from "react";

import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import StoreIcon from "@mui/icons-material/Store";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import PowerIcon from "@mui/icons-material/Power";

const options = [
  {
    label: "Company",
    outlined: <StoreOutlinedIcon />,
    filled: <StoreIcon />,
    description: "Base workflow on company data",
  },
  {
    label: "Record",
    outlined: <ArticleOutlinedIcon />,
    filled: <ArticleIcon />,
    description: "Base workflow on record information",
  },
  {
    label: "Website",
    outlined: <LanguageOutlinedIcon />,
    filled: <LanguageIcon />,
    description: "Base workflow on website activity",
  },
  {
    label: "Expiration",
    outlined: <CalendarTodayOutlinedIcon />,
    filled: <CalendarTodayIcon />,
    description: "Base workflow on expiration dates",
  },
  {
    label: "User",
    outlined: <PersonOutlinedIcon />,
    filled: <PersonIcon />,
    description: "Base workflow on user actions",
  },
  {
    label: "Group",
    outlined: <GroupsOutlinedIcon />,
    filled: <GroupsIcon />,
    description: "Base workflow on group membership",
  },
  {
    label: "Integration",
    outlined: <PowerOutlinedIcon />,
    filled: <PowerIcon />,
    description: "Base workflow on integration events",
  },
];

interface CriteriaProps {
  selected: number | null;
  setSelected: (val: number | null) => void;
}

export default function Criteria({ selected, setSelected }: CriteriaProps) {
  const handleOptionClick = (idx: number) => {
    setSelected(idx === selected ? null : idx);
  };

  return (
    <main
      id="criteria"
      className="modal__content content"
      role="main"
      aria-labelledby="criteria-title"
    >
      <h2 id="criteria-title" className="content__title">
        What will this workflow be based on?
      </h2>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {selected !== null
          ? `${options[selected].label} selected`
          : "No criteria selected"}
      </div>
      <section
        className="options options--criteria"
        role="radiogroup"
        aria-labelledby="criteria-title"
        aria-describedby="criteria-instructions"
      >
        {options.map((option, idx) => (
          <div
            role="radio"
            aria-checked={selected === idx}
            aria-describedby={`criteria-description-${idx}`}
            tabIndex={0}
            key={option.label}
            data-testid="option-item"
            className={
              `options__item options__item--${option.label.toLowerCase()}` +
              (selected === idx ? " options__item--selected" : "")
            }
            onClick={() => handleOptionClick(idx)}
          >
            {selected === idx ? option.filled : option.outlined}
            <span className="options__text">{option.label}</span>
            <span id={`criteria-description-${idx}`} className="sr-only">
              {option.description}.{" "}
              {selected === idx ? "Selected" : "Not selected"}
            </span>
          </div>
        ))}
      </section>
    </main>
  );
}
export { options };
