import React, { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

const SortBy = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Sort By');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    closeDropdown();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const options = ['Alphabet', 'Price', 'Last Added'];

  return (
    <div className="sortBy mt-6 me-2 md:mt-0 md:me-0 relative">
      <button
        className="px-2 py-1 flex gap-3 items-center text-sm"
        onClick={toggleDropdown}
      >
        {selectedOption} <BsChevronDown />
      </button>

      {isDropdownOpen && (
        <ul className="absolute mt-2 py-1 bg-white border border-gray-300 rounded-md shadow-md z-10">
          {options.map((option) => (
            <li
              key={option}
              className="px-2 py-1 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortBy;