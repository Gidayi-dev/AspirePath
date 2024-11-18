// Displays a list of job postings.
// Used in the FindJobs page to show jobs with details like the title, location, and job type.
// Can include pagination if there are many listings.
import React from "react";

function JobList({ jobs = [] }) {

  const jobList = Array.isArray(jobs) ? jobs : [];

  return (
    <div className="mt-8">
      {jobList.length > 0 ? (
        jobList.map((job) => (
          <div
            key={job.id}
            className="p-4 mb-6 bg-gray-200 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
            <p className="text-gray-600">Location: {job.location}</p>
            <p className="text-gray-600">Job Type: {job.type}</p>
            <button className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">
              Apply Now
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">
          No jobs found matching your criteria.
        </p>
      )}
    </div>
  );
}

export default JobList;
