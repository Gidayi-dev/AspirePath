// import React, { useState, useMemo } from "react";
// import countryList from "react-select-country-list";

// function Filter({ onFilterChange }) {
//     const [location, setLocation] = useState("");
//     const [jobType, setJobType] = useState("");
//     const [keyword, setKeyword] = useState("");

//     // Generate the list of countries using useMemo for better performance
//     const countries = useMemo(() => countryList().getData(), []);

//     const handleFilterChange = () => {
//         onFilterChange({ location, jobType, keyword });
//     };

//     return (
//         <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter Jobs</h2>

//             {/* Keyword Filter */}
//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Search a role</label>
//                 <input
//                     type="text"
//                     value={keyword}
//                     onChange={(e) => setKeyword(e.target.value)}
//                     placeholder="e.g., Software Developer"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 />
//             </div>

//             {/* Location Filter */}
//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Location</label>
//                 <select
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 >
//                     <option value="">Worldwide</option>
//                     {countries.map((country) => (
//                         <option key={country.value} value={country.label}>
//                             {country.label}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Job Type Filter */}
//             <div className="mb-6">
//                 <label className="block text-gray-700 font-medium mb-2">Job Type</label>
//                 <div className="flex gap-4">
//                     <label className="flex items-center">
//                         <input
//                             type="radio"
//                             name="jobType"
//                             value=""
//                             checked={jobType === ""}
//                             onChange={(e) => setJobType(e.target.value)}
//                             className="mr-2"
//                         />
//                         All
//                     </label>
//                     <label className="flex items-center">
//                         <input
//                             type="radio"
//                             name="jobType"
//                             value="Remote"
//                             checked={jobType === "Remote"}
//                             onChange={(e) => setJobType(e.target.value)}
//                             className="mr-2"
//                         />
//                         Remote
//                     </label>
//                     <label className="flex items-center">
//                         <input
//                             type="radio"
//                             name="jobType"
//                             value="Hybrid"
//                             checked={jobType === "Hybrid"}
//                             onChange={(e) => setJobType(e.target.value)}
//                             className="mr-2"
//                         />
//                         Hybrid
//                     </label>
//                     <label className="flex items-center">
//                         <input
//                             type="radio"
//                             name="jobType"
//                             value="On-site"
//                             checked={jobType === "On-site"}
//                             onChange={(e) => setJobType(e.target.value)}
//                             className="mr-2"
//                         />
//                         On-site
//                     </label>
//                 </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4">
//                 <button
//                     onClick={handleFilterChange}
//                     className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
//                 >
//                     Apply Filters
//                 </button>
//                 <button
//                     onClick={() => {
//                         setLocation("");
//                         setJobType("");
//                         setKeyword("");
//                         onFilterChange({ location: "", jobType: "", keyword: "" });
//                     }}
//                     className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
//                 >
//                     Reset Filters
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Filter;
import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";

function Filter({ onFilterChange }) {
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [keyword, setKeyword] = useState("");

  const countries = useMemo(() => countryList().getData(), []);

  const handleFilterChange = () => {
    onFilterChange({ location, jobType, keyword });
  };

  return (
    <div className="flex justify-center">
      <div className="w-4/5 p-6 bg-gray-100 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter Jobs</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Search a role
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., Software Developer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Worldwide</option>
            {countries.map((country) => (
              <option key={country.value} value={country.label}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Job Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="jobType"
                value=""
                checked={jobType === ""}
                onChange={(e) => setJobType(e.target.value)}
                className="mr-2"
              />
              All
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="jobType"
                value="Remote"
                checked={jobType === "Remote"}
                onChange={(e) => setJobType(e.target.value)}
                className="mr-2"
              />
              Remote
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="jobType"
                value="Hybrid"
                checked={jobType === "Hybrid"}
                onChange={(e) => setJobType(e.target.value)}
                className="mr-2"
              />
              Hybrid
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="jobType"
                value="On-site"
                checked={jobType === "On-site"}
                onChange={(e) => setJobType(e.target.value)}
                className="mr-2"
              />
              On-site
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleFilterChange}
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Apply Filters
          </button>
          <button
            onClick={() => {
              setLocation("");
              setJobType("");
              setKeyword("");
              onFilterChange({ location: "", jobType: "", keyword: "" });
            }}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
