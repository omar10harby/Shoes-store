import React from "react";
import FilterRadioItem from "./SideBarFilterItem";

function FilterRadioGroup({ title, options, name, selectedValue, onChange }) {
  return (
    <div className="filter d-flex flex-column align-items-center mb-3">
      <h5>{title}</h5>
      <ul className="list-unstyled">
        {options.map((option, i) => (
          <FilterRadioItem
            key={i}
            id={`${name}-${option}`}
            label={option}
            name={name}
            checked={selectedValue.name === option}
            onChange={() => onChange(option)}
          />
        ))}
      </ul>
    </div>
  );
}

export default FilterRadioGroup;