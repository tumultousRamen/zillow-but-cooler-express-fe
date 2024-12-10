import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const SearchBar: React.FC = () => {
  return (
    <div className="relative w-[327px] h-[64px] bg-[#F7F7FD] border-2 border-[#E0DEF7] rounded-lg flex items-center px-4 gap-4">
      {/* Search Icon */}
      <div className="w-6 h-6 flex items-center justify-center rounded-full">
        <FontAwesomeIcon icon={faSearch} className="text-primary" />
      </div>
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-transparent text-[#000929] opacity-50 text-sm font-medium focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
