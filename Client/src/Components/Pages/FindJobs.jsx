// The main page where users can browse and search for job listings.
// Uses JobList.js, SearchBar.js, and FilterSidebar.js components.
// Includes functionality to apply for jobs directly from this page.
import React, { useState, useEffect } from "react";
import NavBar from "../Navbar";

const sampleJobs = [
  {
    id: 1,
    title: "Software Developer",
    location: "Remote",
    type: "Remote",
    description: "Work with a team of developers on various projects.",
  },
  {
    id: 2,
    title: "Data Scientist",
    location: "New York",
    type: "On-site",
    description: "Analyze data to provide actionable insights.",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    location: "San Francisco",
    type: "Hybrid",
    description: "Build modern, responsive web applications.",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    location: "Remote",
    type: "Remote",
    description: "Manage infrastructure and deployment pipelines.",
  },
  {
    id: 5,
    title: "Product Manager",
    location: "Chicago",
    type: "On-site",
    description: "Lead product development teams and strategies.",
  },
];

function FindJobs() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [jobs, setJobs] = useState(sampleJobs);
  const [page, setPage] = useState(1);
  const [jobsPerPage] = useState(3);

  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword = job.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesLocation =
      location === "" ||
      job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = type === "" || job.type === type;

    return matchesKeyword && matchesLocation && matchesType;
  });

  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setPage(pageNumber);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Find Jobs</h2>

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
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-50 shadow-md p-6 mb-4 rounded-lg border border-gray-200"
              >
                <h3 className="text-2xl font-bold">{job.title}</h3>
                <p className="text-gray-700">Location: {job.location}</p>
                <p className="text-gray-700">Job Type: {job.type}</p>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <button className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-700">
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No jobs found matching your criteria.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          {filteredJobs.length > jobsPerPage && (
            <div className="flex items-center space-x-4">
              {[...Array(Math.ceil(filteredJobs.length / jobsPerPage))].map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded ${
                      page === index + 1
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-700"
                    } hover:bg-gray-300`}
                  >
                    {index + 1}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindJobs;
