import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar";
import SearchBar from "../SearchBar";

function FindJobs() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [jobs, setJobs] = useState([]); // State to store jobs fetched from the backend
  const [page, setPage] = useState(1);
  const [jobsPerPage] = useState(3);

  const navigate = useNavigate();

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://your-backend-api.com/jobs");
        const data = await response.json();
        setJobs(data); // Set the fetched jobs to state
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on the search and filter conditions
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

  const handleApplyNow = (id) => {
    navigate(`/JobDetails/${id}`); // Fixed to navigate using the correct id
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Find Jobs</h2>

        {/* Filters Section */}
        <div className="flex w-full justify-between mb-10">
          <SearchBar
            location={location}
            setLocation={setLocation}
            type={type}
            setType={setType}
          />
          <div className="w-full max-w-3xl">
            <SearchBar keyword={keyword} setKeyword={setKeyword} />
          </div>
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
                <button
                  onClick={() => handleApplyNow(job.id)}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
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
          <button
            onClick={() => paginate(page - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            onClick={() => paginate(page + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            disabled={page * jobsPerPage >= filteredJobs.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default FindJobs;
