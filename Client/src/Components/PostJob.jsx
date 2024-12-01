import React, { useState } from "react";
import NavBarProfile from "./Navbarprofile";

function PostJob() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start loading state
    setLoading(true);
    setError(null);

    const jobData = {
      title,
      location,
      company,
      type,
      description,
    };
    try {
      const response = await fetch("http://localhost:4000/jobs", {
        method: "POST",
        credentials: "include", // Include credentials for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      console.log("Response", response);

      if (response.ok) {
        const result = await response.json();
        alert(`Job posted successfully: ${result.title}`);
        setTitle("");
        setLocation("");
        setCompany("");
        setType("");
        setDescription("");
      } else {
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        setError(errorData.error || "Failed to post job.");
      }
    } catch (err) {
      console.error("Fetch Error:", err); // Correct error logging
      setError("An error occurred while posting the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBarProfile />
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
            <label className="block text-gray-700 font-medium">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
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
              required
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
            disabled={loading} // Disable button while loading
          >
            {loading ? "Posting..." : "Post Job"}
          </button>

          {error && (
            <div className="text-red-500 mt-4">
              <p>{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostJob;
