import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center bg-white p-2 border border-gray-600 my-4">
      <input
        type="text"
        placeholder="Author Name"
        className="outline-none w-full text-sm"
        onChange={handleInputChange}
      />
      <div className="text-gray-500">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBox;