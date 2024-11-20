import React, { useState } from "react";
import NavBar from "./Navbar";

function Profile() {
  // Initial user data
  const [user, setUser] = useState({
    name: "Millyannah Gidayi",
    email: "millyannahi@gmail.com",
    phone: "+254745691986",
    location: "Nairobi, Kenya",
    bio: "Aspiring software developer with a passion for full-stack development and machine learning.",
    skills: [
      "JavaScript",
      "React",
      "Python",
      "Docker",
      "Golang",
      "HTML",
      "CSS",
    ],
    experience: [
      {
        role: "Software Developer",
        company: "Teach2Give",
        duration: "Sep 2024 - Nov 2024",
      },
      {
        role: "Frontend Developer",
        company: "Metify",
        duration: "Jan 2024 - Mar 2024",
      },
    ],
  });

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for editing the user's information
  const [editedUser, setEditedUser] = useState({ ...user });

  // Handle change in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Handle form submission (simulating updating user data)
  const handleSave = () => {
    setUser({ ...editedUser });
    setIsEditing(false);
  };

  // Handle cancel (reset to original data)
  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                className="text-4xl font-bold mb-4 w-full border-b border-gray-300 focus:outline-none"
              />
            ) : (
              user.name
            )}
          </h2>

          <p className="text-gray-600 mb-4">
            Email:{" "}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none"
              />
            ) : (
              user.email
            )}
          </p>

          <p className="text-gray-600 mb-4">
            Phone:{" "}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none"
              />
            ) : (
              user.phone
            )}
          </p>

          <p className="text-gray-600 mb-6">
            Location:{" "}
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={editedUser.location}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none"
              />
            ) : (
              user.location
            )}
          </p>

          <p className="text-gray-800 mb-6">
            {isEditing ? (
              <textarea
                name="bio"
                value={editedUser.bio}
                onChange={handleChange}
                className="w-full h-24 border-b border-gray-300 focus:outline-none"
              />
            ) : (
              user.bio
            )}
          </p>

          <h3 className="text-2xl font-semibold mb-4">Skills</h3>
          <ul className="mb-6">
            {user.skills.map((skill, index) => (
              <li key={index} className="text-gray-700">
                -{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="skills"
                    value={editedUser.skills[index]}
                    onChange={(e) => {
                      const updatedSkills = [...editedUser.skills];
                      updatedSkills[index] = e.target.value;
                      setEditedUser({ ...editedUser, skills: updatedSkills });
                    }}
                    className="w-full border-b border-gray-300 focus:outline-none"
                  />
                ) : (
                  skill
                )}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Experience</h3>
          <ul>
            {user.experience.map((exp, index) => (
              <li key={index} className="mb-3">
                <span className="font-bold">
                  {isEditing ? (
                    <input
                      type="text"
                      name="role"
                      value={editedUser.experience[index]?.role}
                      onChange={(e) => {
                        const updatedExperience = [...editedUser.experience];
                        updatedExperience[index].role = e.target.value;
                        setEditedUser({
                          ...editedUser,
                          experience: updatedExperience,
                        });
                      }}
                      className="w-full border-b border-gray-300 focus:outline-none"
                    />
                  ) : (
                    exp.role
                  )}
                </span>{" "}
                at{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="company"
                    value={editedUser.experience[index]?.company}
                    onChange={(e) => {
                      const updatedExperience = [...editedUser.experience];
                      updatedExperience[index].company = e.target.value;
                      setEditedUser({
                        ...editedUser,
                        experience: updatedExperience,
                      });
                    }}
                    className="w-full border-b border-gray-300 focus:outline-none"
                  />
                ) : (
                  exp.company
                )}
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
