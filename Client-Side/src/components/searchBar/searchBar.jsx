import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
//   const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <form className="flex items-center w-full max-w-md mx-auto">
      <div className="relative w-full">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          onChange={handleSubmit}
        />
        <AiOutlineSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </form>
  );
};

export default SearchBar;
