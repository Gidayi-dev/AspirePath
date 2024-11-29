import React, { useEffect, useState } from "react";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/user/jobs"); // Your backend API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>My Posted Jobs</h1>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <h2>{job.title}</h2>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Company:</strong> {job.company}
              </p>
              <p>
                <strong>Job Type:</strong> {job.jobType}
              </p>
              <p>
                <strong>Description:</strong> {job.description}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't posted any jobs yet.</p>
      )}
    </div>
  );
};

export default MyJobs;
