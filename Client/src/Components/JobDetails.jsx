// Displays the detailed view of a single job when clicked on from the job list.
// Shows job description, requirements, salary, application button, etc.
import React from "react";
import { useParams } from "react-router-dom";

const sampleJobs = [
  {
    id: 1,
    title: "Software Developer",
    company: "Teach2Give",
    location: "Remote",
    type: "Remote",
    description:
      "Develop and maintain web applications using JavaScript and React.",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Metify",
    location: "New York",
    type: "On-site",
    description:
      "Analyze large datasets to gain insights and drive business decisions.",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Sportserve",
    location: "San Francisco",
    type: "Hybrid",
    description:
      "Work on frontend web applications using React and TailwindCSS.",
  },
];

function JobDetails() {
  const { jobId } = useParams();
  const job = sampleJobs.find((job) => job.id === parseInt(jobId));

  if (!job) {
    return <p className="text-center text-red-500 mt-10">Job not found</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-4xl font-bold mb-4">{job.title}</h2>
        <p className="text-gray-700 mb-2">Company: {job.company}</p>
        <p className="text-gray-700 mb-2">Location: {job.location}</p>
        <p className="text-gray-700 mb-2">Job Type: {job.type}</p>
        <p className="text-gray-800 mt-6">{job.description}</p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobDetails;
