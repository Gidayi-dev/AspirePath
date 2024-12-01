import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../Navbar";
import SearchBar from "../SearchBar";
import Filter from "../FilterSidebar";

function FindJobs() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [jobs, setJobs] = useState([]); // State to store jobs fetched from the backend
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [page, setPage] = useState(1);
  const jobsPerPage = 3;

  const navigate = useNavigate();

  // Fetch jobs from backend using axios
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:4000/jobs", {
          withCredentials: true, // Include cookies in the request
        });
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on the search and filter conditions
  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword = keyword
      ? job.title?.toLowerCase().includes(keyword.toLowerCase())
      : true;
    const matchesLocation = location
      ? job.location?.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesType = type
      ? job.type?.toLowerCase() === type.toLowerCase()
      : true;

    return matchesKeyword && matchesLocation && matchesType;
  });

  const handleFilterChange = (filters) => {
    setKeyword(filters.keyword);
    setLocation(filters.location);
    setType(filters.jobType);
    setPage(1); // Reset pagination to the first page when filters change
  };

  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(filteredJobs.length / jobsPerPage)
    ) {
      setPage(pageNumber);
    }
  };

  const handleApplyNow = (id) => {
    navigate(`/JobDetails/${id}`);
  };

  return (
    <div>
      <NavBar />
      <div className="mt-3">
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Find Jobs</h2>
        {/* Job Listings */}
        <div className="w-full max-w-3xl">
          {loading ? (
            <p className="text-gray-500">Loading jobs...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : currentJobs.length > 0 ? (
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
