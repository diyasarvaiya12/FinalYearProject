import React, { useState, useRef } from "react";

const MultiSelectComponent = ({ options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle checkbox selection
  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div
        className="border border-gray-300 px-4 py-3 bg-white text-gray-700 cursor-pointer rounded-md flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span>
          {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select Services"}
        </span>
        <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-md rounded-md max-h-40 overflow-y-auto">
          {options.map((option, index) => (
            <label key={index} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectComponent;
