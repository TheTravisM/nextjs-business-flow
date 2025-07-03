import React, { useState } from "react";

import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import StoreIcon from "@mui/icons-material/Store";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import PowerIcon from "@mui/icons-material/Power";

const options = [
  {
    label: "Company",
    outlined: <StoreOutlinedIcon />,
    filled: <StoreIcon />,
  },
  {
    label: "Record",
    outlined: <ArticleOutlinedIcon />,
    filled: <ArticleIcon />,
  },
  {
    label: "Website",
    outlined: <LanguageOutlinedIcon />,
    filled: <LanguageIcon />,
  },
  {
    label: "Expiration",
    outlined: <CalendarTodayOutlinedIcon />,
    filled: <CalendarTodayIcon />,
  },
  {
    label: "User",
    outlined: <PersonOutlineOutlinedIcon />,
    filled: <PersonOutlineIcon />,
  },
  {
    label: "Group",
    outlined: <GroupsOutlinedIcon />,
    filled: <GroupsIcon />,
  },
  {
    label: "Integration",
    outlined: <PowerOutlinedIcon />,
    filled: <PowerIcon />,
  },
];

export default function Criteria01({
  selected,
  setSelected,
}: {
  selected: number | null;
  setSelected: (val: number | null) => void;
}) {
  const handleOptionClick = (idx: number) => {
    setSelected(idx === selected ? null : idx);
  };

  return (
    <main id="criteria-01" className="modal__content content">
      <h2 className="content__title">What will this workflow be based on?</h2>
      <section className="options options--criteria-01">
        {options.map((option, idx) => (
          <div
            key={option.label}
            className={
              `options__item options__item--${option.label.toLowerCase()}` +
              (selected === idx ? " options__item--selected" : "")
            }
            onClick={() => handleOptionClick(idx)}
            style={{ cursor: "pointer" }}
          >
            {selected === idx ? option.filled : option.outlined}
            <span className="options__text">{option.label}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
export { options };
