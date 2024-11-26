import React, { useState } from "react";
import NavBar from "./Navbar";
import { Link } from "react-router-dom"; // Import Link for navigation

function Profile() {
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
      <NavBar />
      <div className="profile-container mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg">
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
                className="bg-blue-500 text-white p-2 rounded"
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
                placeholder="Tell us about yourself"
                className="w-full p-2 border rounded"
              ></textarea>
            </div>

            {/* Skills Selection */}
            <div className="skills-section mb-6">
              <label className="block text-gray-700">Skills</label>
              <select
                onChange={handleSkillSelection}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a skill...</option>
                {/* Example skills */}
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="Python">Python</option>
                <option value="SQL">SQL</option>
              </select>

              <div className="custom-skill mt-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={handleCustomSkillChange}
                  placeholder="Or type your skill..."
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSkill}
                  className="mt-2 p-2 bg-gray-500 text-white rounded"
                >
                  Add Skill
                </button>
              </div>

              <div className="selected-skills mt-2 ">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 p-2 m-1 rounded-full flex items-center width: fit-content"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-red-500"
                    >
                      X
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="education-section mb-6">
              <label className="block text-gray-700">Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Enter your education details"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Work Experience */}
            <div className="experience-section mb-6">
              <label className="block text-gray-700">Work Experience</label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Describe your work experience"
                className="w-full p-2 border rounded"
              ></textarea>
            </div>

            {/* Resume Upload */}
            <div className="resume-upload mb-6">
              <label className="block text-gray-700">Resume</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="border p-2 rounded"
              />
            </div>

            {/* Company Information (Optional for Employers) */}
            <div className="company-info mb-6">
              <label className="block text-gray-700">
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="company-description mb-6">
              <label className="block text-gray-700">
                Company Description (Optional)
              </label>
              <textarea
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder="Describe your company"
                className="w-full p-2 border rounded"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-gray-500 text-white p-2 rounded mt-4"
            >
              Save Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
