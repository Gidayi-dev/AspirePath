import React, { useState, useEffect } from "react";
import axios from "axios";

const UserJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [jobError, setJobError] = useState("");

  const fetchMyJobs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/jobs/user", {
        withCredentials: true, // Ensure that cookies are sent with the request
      });
      if (response.data) {
        setMyJobs(response.data);
      } else {
        setJobError("No jobs found.");
      }
    } catch (e) {
      setJobError("Failed to fetch jobs.");
    } finally {
      setIsJobLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Jobs</h1>
      {isJobLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : jobError ? (
        <div className="text-red-500 text-center py-4">{jobError}</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {job.title}
              </h2>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-gray-500 text-sm">{job.location}</p>
              <div className="mt-4">
                <a
                  href={`/JobDetails/${job.id}`}
                  className="text-indigo-600 hover:text-indigo-900 text-sm"
                >
                  View Job Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserJobs;
