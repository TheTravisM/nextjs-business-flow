import React from "react";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import StoreIcon from "@mui/icons-material/Store";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import LanIcon from '@mui/icons-material/Lan';
import LensOutlinedIcon from '@mui/icons-material/LensOutlined';
import LensIcon from '@mui/icons-material/Lens';


const options = [
  {
    label: "Password",
    outlined: <VpnKeyOutlinedIcon />,
    filled: <VpnKeyIcon />,
  },
  {
    label: "Company KB Article",
    outlined: <ArticleOutlinedIcon />,
    filled: <ArticleIcon />,
  },
  {
    label: "Central KB Article",
    outlined: <ArticleOutlinedIcon />,
    filled: <ArticleIcon />,
  },
  {
    label: "Process",
    outlined: <StoreOutlinedIcon />,
    filled: <StoreIcon />,
  },
  {
    label: "Website",
    outlined: <LanguageOutlinedIcon />,
    filled: <LanguageIcon />,
  },
  {
    label: "Rack",
    outlined: <ViewColumnOutlinedIcon />,
    filled: <ViewColumnIcon />,
  },
  {
    label: "Network",
    outlined: <LanOutlinedIcon />,
    filled: <LanIcon />,
  },
  {
    label: "Asset",
    outlined: <LensOutlinedIcon />,
    filled: <LensIcon />,
  },
];

export default function CriteriaType({
  selected,
  setSelected,
}: {
  selected: boolean[];
  setSelected: (val: boolean[]) => void;
}) {
  const allSelected = selected.every(Boolean);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(Array(options.length).fill(e.target.checked));
  };

  const handleOptionClick = (idx: number) => {
    const updated = [...selected];
    updated[idx] = !updated[idx];
    setSelected(updated);
  };

  return (
    <main id="criteria-02" className="modal__content content">
      <h2 className="content__title">
        Which record type(s) should be included?
      </h2>
      <section className="options options--criteria-01">
        {options.map((option, idx) => (
          <div
            key={option.label}
            className={`options__item${
              selected[idx] ? " options__item--selected" : ""
            }`}
            onClick={() => handleOptionClick(idx)}
            style={{ cursor: "pointer" }}
          >
            {selected[idx] ? option.filled : option.outlined}
            <span className="options__text">{option.label}</span>
          </div>
        ))}
  <label htmlFor="select-all" className="options__check-box">
    <input
      type="checkbox"
      id="select-all"
      name="select-all"
      checked={allSelected}
      onChange={handleSelectAll}
    />
    Select All
  </label>
      </section>
    </main>
  );
}
export { options as CriteriaTypeOptions };