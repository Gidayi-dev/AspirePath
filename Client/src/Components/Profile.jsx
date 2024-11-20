import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(""); // Store role
  const [jobs, setJobs] = useState([]); // Jobs for employers
  const [applications, setApplications] = useState([]); // Applications for job seekers
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile from the backend
    axios
      .get("/profile")
      .then((response) => {
        setUser(response.data.user);
        setRole(response.data.user.role);
        if (response.data.user.role === "EMPLOYER") {
          setJobs(response.data.jobsPosted);
        } else {
          setApplications(response.data.applications);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>

        {/* Employer-Specific Section */}
        {role === "EMPLOYER" && (
          <div>
            <h2>Company Details</h2>
            <p>Company Name: {user.companyName}</p>{" "}
            {/* Assume `companyName` is part of the User model */}
            <p>Company Description: {user.companyDescription}</p>{" "}
            {/* Assume `companyDescription` */}
            <h3>Posted Jobs</h3>
            {jobs.length === 0 ? (
              <p>No jobs posted yet.</p>
            ) : (
              jobs.map((job) => (
                <div key={job.id}>
                  <h4>{job.title}</h4>
                  <p>{job.description}</p>
                  <button>Edit Job</button>
                  <button>Remove Job</button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Job Seeker-Specific Section */}
        {role === "JOBSEEKER" && (
          <div>
            <h2>Your Applications</h2>
            {applications.length === 0 ? (
              <p>You have not applied for any jobs yet.</p>
            ) : (
              applications.map((application) => (
                <div key={application.id}>
                  <p>Job Title: {application.job.title}</p>
                  <p>Status: {application.status}</p>{" "}
                  {/* You can track application status */}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
