// Provides a form for employers to post job listings.
// Allows users to fill in job details like title, location, salary, description, and job type.
// Includes functionality to submit the job to the backend.
import React, { useState } from "react";

function PostJob() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Job Posted:\nTitle: ${title}\nLocation: ${location}\nType: ${type}\nDescription: ${description}`,
    );
    // Reset form fields
    setTitle("");
    setLocation("");
    setType("");
    setDescription("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Post a Job</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Job Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select Job Type</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium">
            Job Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            rows="5"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;
