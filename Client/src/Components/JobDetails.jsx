import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);

      try {
        // Replace the mock data with a real API call
        const response = await fetch(`/jobs/${jobId}`);
        const data = await response.json();

        setJob(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending to server)
    alert("You have successfully applied for the job!");
  };

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
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
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
          onClick={() => alert("You have applied for the job!")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Apply Now
        </button>

        <button
          onClick={() => navigate("/Findjobs")}
          className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg mt-4 hover:bg-gray-400"
        >
          Back to Job Listings
        </button>
      </div>

      {/* Application Form */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Job Application</h3>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-lg font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Upload Resume
            </label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Upload Cover Letter
            </label>
            <input
              type="file"
              onChange={(e) => setCoverLetter(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobDetails;
