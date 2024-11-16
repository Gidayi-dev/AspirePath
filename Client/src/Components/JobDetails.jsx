// Displays the detailed view of a single job when clicked on from the job list.
// Shows job description, requirements, salary, application button, etc.
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function JobDetails() {
  const { jobId } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null); // Store the job details
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Simulate fetching job data (replace with actual API call)
  useEffect(() => {
    // Simulate fetching data based on jobId (replace with API call)
    const fetchJobDetails = async () => {
      setLoading(true);
      // Example mock data, replace this with an actual API call
      const jobData = {
        id: jobId,
        title: "Software Engineer",
        company: "Tech Corp",
        description:
          "We are looking for a highly skilled Software Engineer to join our team. You will be responsible for building and maintaining web applications.",
        requirements:
          "3+ years of experience in web development, proficient in React, JavaScript, HTML, CSS.",
        salary: "$90,000 - $120,000 per year",
      };
      setJob(jobData);
      setLoading(false);
    };

    fetchJobDetails();
  }, [jobId]);

  // Handle application button click
  const handleApply = () => {
    // Redirect to application page or open a modal (optional)
    alert("You have applied for the job!");
  };

  // Loading or error handling UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl">Loading job details...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-500">Job not found!</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold">{job.title}</h2>
        <h3 className="text-xl text-gray-600 mb-4">{job.company}</h3>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold mb-2">Job Description:</h4>
          <p>{job.description}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold mb-2">Requirements:</h4>
          <ul className="list-disc pl-6">
            <li>{job.requirements}</li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold mb-2">Salary:</h4>
          <p>{job.salary}</p>
        </div>

        <button
          onClick={handleApply}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Apply Now
        </button>

        <button
          onClick={() => navigate("/findjobs")}
          className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg mt-4 hover:bg-gray-400"
        >
          Back to Job Listings
        </button>
      </div>
    </div>
  );
}

export default JobDetails;
