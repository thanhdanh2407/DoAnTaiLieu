import React, { useState } from "react";
import "./index.css";

const Dropdown = ({ label, options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdownContainer">
      <label className="dropdownLabel">
        {label}
        <span className="requiredStar">*</span>
      </label>
      <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
        <div className="dropdownValue">
          {value ? value : `-- Chọn ${label.toLowerCase()} --`}
        </div>
        {isOpen && (
          <div className="dropdownOptions">
            {options.map((option, index) => (
              <div
                key={index}
                className="dropdownOption"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
