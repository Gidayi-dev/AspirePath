// The main page where users can browse and search for job listings.
// Uses JobList.js, SearchBar.js, and FilterSidebar.js components.
// Includes functionality to apply for jobs directly from this page.
import React, { useState } from "react";

// Sample job data
const sampleJobs = [
  { id: 1, title: "Software Developer", location: "Remote", type: "Remote" },
  { id: 2, title: "Data Scientist", location: "New York", type: "On-site" },
  {
    id: 3,
    title: "Frontend Engineer",
    location: "San Francisco",
    type: "Hybrid",
  },
  { id: 4, title: "DevOps Engineer", location: "Remote", type: "Remote" },
  { id: 5, title: "Product Manager", location: "Chicago", type: "On-site" },
];

function FindJobs() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  // Function to filter jobs based on search criteria
  const filteredJobs = sampleJobs.filter((job) => {
    const matchesKeyword = job.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesLocation =
      location === "" ||
      job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = type === "" || job.type === type;

    return matchesKeyword && matchesLocation && matchesType;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Find Jobs</h2>

      {/* Filters */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-10">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Search by Job Title
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., Software Developer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Remote, New York"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Job Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Types</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        <button
          onClick={() => {
            setKeyword("");
            setLocation("");
            setType("");
          }}
          className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Reset Filters
        </button>
      </div>

      {/* Job Listings */}
      <div className="w-full max-w-3xl">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-50 shadow-md p-6 mb-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold">{job.title}</h3>
              <p className="text-gray-700">Location: {job.location}</p>
              <p className="text-gray-700">Job Type: {job.type}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No jobs found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default FindJobs;
