import React, { useCallback, useMemo } from "react";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import StoreIcon from "@mui/icons-material/Store";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import LanOutlinedIcon from "@mui/icons-material/LanOutlined";
import LanIcon from "@mui/icons-material/Lan";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import LensIcon from "@mui/icons-material/Lens";

const options = [
  {
    label: "Password",
    outlined: <VpnKeyOutlinedIcon />,
    filled: <VpnKeyIcon />,
    description: "Password records and credentials",
  },
  {
    label: "Company KB Article",
    outlined: <ArticleOutlinedIcon />,
    filled: <ArticleIcon />,
    description: "Company knowledge base articles",
  },
  {
    label: "Central KB Article",
    outlined: <ArticleOutlinedIcon />,
    filled: <ArticleIcon />,
    description: "Central knowledge base articles",
  },
  {
    label: "Process",
    outlined: <StoreOutlinedIcon />,
    filled: <StoreIcon />,
    description: "Business process records",
  },
  {
    label: "Website",
    outlined: <LanguageOutlinedIcon />,
    filled: <LanguageIcon />,
    description: "Website and domain records",
  },
  {
    label: "Rack",
    outlined: <ViewColumnOutlinedIcon />,
    filled: <ViewColumnIcon />,
    description: "Server rack and equipment records",
  },
  {
    label: "Network",
    outlined: <LanOutlinedIcon />,
    filled: <LanIcon />,
    description: "Network configuration records",
  },
  {
    label: "Asset",
    outlined: <LensOutlinedIcon />,
    filled: <LensIcon />,
    description: "Asset and inventory records",
  },
];

interface CriteriaTypeProps {
  selected: boolean[];
  setSelected: (val: boolean[]) => void;
}

export default function CriteriaType({
  selected,
  setSelected,
}: CriteriaTypeProps) {

  const allSelected = useMemo(
    () => selected.every(Boolean), 
    [selected]
  );

  const selectedCount = useMemo(
    () => selected.filter(Boolean).length,
    [selected]
  );

  const handleSelectAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(Array(options.length).fill(e.target.checked));
    },
    [setSelected]
  );

  const handleOptionClick = useCallback(
    (idx: number) => {
      const updated = [...selected];
      updated[idx] = !updated[idx];
      setSelected(updated);
    },
    [selected, setSelected]
  );

  return (
    <main
      id="criteria-type"
      className="modal__content content"
      role="main"
      aria-labelledby="criteria-type-title"
    >
      <h2 id="criteria-type-title" className="content__title">
        Which record type(s) should be included?
      </h2>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {selectedCount} of {options.length} record types selected
      </div>
      <section
        className="options options--criteria-type"
        role="group"
        aria-labelledby="criteria-type-title"
        aria-describedby="criteria-type-instructions"
      >
        {options.map((option, idx) => (
          <div
            role="checkbox"
            aria-checked={selected[idx]}
            aria-describedby={`criteria-type-description-${idx}`}
            tabIndex={0}
            key={option.label}
            data-testid="option-item"
            className={`options__item${
              selected[idx] ? " options__item--selected" : ""
            }`}
            onClick={() => handleOptionClick(idx)}
          >
            {selected[idx] ? option.filled : option.outlined}
            <span className="options__text">{option.label}</span>
            <span id={`criteria-type-description-${idx}`} className="sr-only">
              {option.description}.{" "}
              {selected[idx] ? "Selected" : "Not selected"}
            </span>
          </div>
        ))}
        <label
          htmlFor="select-all"
          className={`options__check-box ${
            allSelected ? " options__check-box--checked" : ""
          }`}
        >
          <input
            type="checkbox"
            id="select-all"
            name="select-all"
            checked={allSelected}
            onChange={handleSelectAll}
            aria-describedby="select-all-description"
          />
          Select all
          <span id="select-all-description" className="sr-only">
            {allSelected
              ? "All record types selected"
              : "Select all record types at once"}
          </span>
        </label>
      </section>
    </main>
  );
}
export { options as CriteriaTypeOptions };
