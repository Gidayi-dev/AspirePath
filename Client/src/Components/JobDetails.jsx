// import React, { useEffect, useState } from "react";
import React, { useState, useEffect } from "react"; // <-- Add useState and useEffect here
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false); // New state for submission status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:4000/jobs/${jobId}`,
          {
            withCredentials: true,
          },
        );

        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can make an actual API request to submit the data
    // For now, we simulate success by setting the state
    setApplicationSubmitted(true);

    // Optionally, reset form data
    setFirstName("");
    setLastName("");
    setEmail("");
    setResume(null);
    setCoverLetter(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl">Loading job details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-500">{error}</div>
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
    <div className="container mx-auto p-4 max-w-xl">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold">{job.title}</h2>
        <h3 className="text-xl text-gray-600 mb-4">{job.company}</h3>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold mb-2">Job Description:</h4>
          <p>{job.description}</p>
        </div>

        <div className="mb-2">
          <h4 className="text-2xl font-semibold mb-2">Requirements:</h4>
          <ul className="list-disc pl-6">
            {job?.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold mb-2">Salary:</h4>
          <p>{job.salary}</p>
        </div>

        <button
          onClick={() => navigate("/Findjobs")}
          className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg mt-4 hover:bg-gray-400"
        >
          Back to Job Listings
        </button>
      </div>

      {/* Conditional Rendering for Form or Success Message */}
      {!applicationSubmitted ? (
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
      ) : (
        <div className="text-center text-green-500 text-xl mt-6">
          Application Sent! Thank you for applying.
        </div>
      )}
    </div>
  );
}

export default JobDetails;
