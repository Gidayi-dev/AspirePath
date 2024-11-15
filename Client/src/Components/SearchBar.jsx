// Allows users to search for jobs by keywords (like job title or company).
// Triggers a search query to filter the job listings based on user input.
import React from "react";
import BgImage from "/src/assets/bg-image-1.jpg";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex justify-center mt-6 mb-7">
      <input
        type="text"
        placeholder="Search for jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[50%] lg:w-[40%] px-6 py-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:border-gray-500 text-lg rounded-l-3xl rounded-r-3xl mt-32"
      />
    </div>
  );
}

export default SearchBar;
