import React, { useState, useEffect } from "react";
import NavBarProfile from "./Navbarprofile";
import { useAuth } from "../authContext/authContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import UserJobs from "./userJobs";

function Profile() {
  const { auth } = useAuth(); // Use auth context to check authentication status
  const [image, setImage] = useState(null); // Profile image
  const [skills, setSkills] = useState([]); // Selected skills
  const [newSkill, setNewSkill] = useState(""); // New skill to add
  const [education, setEducation] = useState(""); // Education details
  const [experience, setExperience] = useState(""); // Work experience
  const [bio, setBio] = useState(""); // Bio description
  const [resume, setResume] = useState(null); // Resume file
  const [companyName, setCompanyName] = useState(""); // Company name for employers
  const [companyDescription, setCompanyDescription] = useState(""); // Company description for employers
  const [savedProfile, setSavedProfile] = useState(null); // To store and display saved profile data
  const [error, setError] = useState(""); // For form errors
  const [isEditing, setIsEditing] = useState(false);
  const [myJobs, setMyJobs] = useState([]); // Jobs posted by the user
  const [jobError, setJobError] = useState(""); // For job fetch errors
  const [isJobLoading, setIsJobLoading] = useState(true); // For job loading state
  const navigate = useNavigate();

  // Redirect if the user is not authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [auth, navigate]);

  // Fetch the jobs posted by the logged-in user
  // useEffect(() => {
  //   if (auth?.userId) {
  //     fetchMyJobs(auth.userId);
  //   }
  // }, [auth]);

  const fetchMyJobs = async (userId) => {
    try {
      const response = await fetch("http://localhost:4000/jobs/user", {
        method: "GET",
        credentials: "include", // Include credentials for cookies
      });

      const data = await response.json();
      if (data.jobs) {
        setMyJobs(data.jobs);
      } else {
        setJobError("No jobs found.");
      }
    } catch (e) {
      setJobError("Failed to fetch jobs.");
    } finally {
      setIsJobLoading(false);
    }
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle Skill Selection (adding/removing)
  const handleSkillSelection = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !skills.includes(selectedSkill)) {
      setSkills((prevSkills) => [...prevSkills, selectedSkill]);
    }
  };

  // Handle Custom Skill Input
  const handleCustomSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleAddCustomSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill(""); // Clear input field after adding
    }
  };

  // Remove Skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Handle Resume Upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  // Form Submission Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bio || !education || !experience) {
      setError("Please fill in all the required fields.");
      return;
    }
    // Save the profile data and display it
    setSavedProfile({
      image,
      skills,
      education,
      experience,
      bio,
      resume,
      companyName,
      companyDescription,
    });
    setIsEditing(false);
  };

  return (
    <div>
      <NavBarProfile />
      <div className="profile-container mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg mt-7">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Display Profile Information */}
        {savedProfile ? (
          <div className="saved-profile">
            <div className="profile-info">
              {savedProfile.image && (
                <img
                  src={savedProfile.image}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full"
                />
              )}
              <h3 className="text-xl font-bold">{savedProfile.bio}</h3>
              <p>
                <strong>Education:</strong> {savedProfile.education}
              </p>
              <p>
                <strong>Experience:</strong> {savedProfile.experience}
              </p>

              {/* Show Company Info only if available */}
              {savedProfile.companyName && (
                <p>
                  <strong>Company Name:</strong> {savedProfile.companyName}
                </p>
              )}
              {savedProfile.companyDescription && (
                <p>
                  <strong>Company Description:</strong>{" "}
                  {savedProfile.companyDescription}
                </p>
              )}

              <h4 className="text-lg font-semibold">Skills</h4>
              <div className="skills-list">
                {savedProfile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 p-2 m-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {/* Edit Profile Button */}
            <div className="text-center mt-4">
              <button
                onClick={() => setSavedProfile(null)} // Toggle to Edit Mode
                className="bg-gray-500 text-white p-2 rounded"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <div className="image-upload mb-6">
              <label className="block text-gray-700">Profile Picture</label>
              <div className="profile-image-preview mb-2">
                {image ? (
                  <img
                    src={image}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border p-2 rounded"
              />
            </div>

            {/* Bio */}
            <div className="bio-section mb-6">
              <label className="block text-gray-700">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your bio"
                rows="4"
              />
            </div>

            {/* Education */}
            <div className="education-section mb-6">
              <label className="block text-gray-700">Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your education"
              />
            </div>

            {/* Work Experience */}
            <div className="experience-section mb-6">
              <label className="block text-gray-700">Work Experience</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your work experience"
              />
            </div>

            {/* Skills */}
            <div className="skills-section mb-6">
              <label className="block text-gray-700">Skills</label>
              <input
                type="text"
                value={newSkill}
                onChange={handleCustomSkillChange}
                className="w-full p-2 border rounded"
                placeholder="Add a custom skill"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="mt-2 bg-blue-500 text-white p-2 rounded"
              >
                Add Skill
              </button>
            </div>

            {/* Resume Upload */}
            <div className="resume-upload mb-6">
              <label className="block text-gray-700">Upload Resume</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="border p-2 rounded"
              />
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save Profile
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="my-jobs-section mt-6 mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">My Jobs</h2>
        <UserJobs />
      </div>
    </div>
  );
}

export default Profile;
