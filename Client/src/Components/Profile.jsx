// Displays the user profile for job seekers or employers.
// Shows user information and possibly saved jobs, applications, or posted jobs.
import React from "react";

function Profile() {
  // Sample user data
  const user = {
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-4xl font-bold mb-4">{user.name}</h2>
        <p className="text-gray-600 mb-4">Email: {user.email}</p>
        <p className="text-gray-600 mb-4">Phone: {user.phone}</p>
        <p className="text-gray-600 mb-6">Location: {user.location}</p>
        <p className="text-gray-800 mb-6">{user.bio}</p>

        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        <ul className="mb-6">
          {user.skills.map((skill, index) => (
            <li key={index} className="text-gray-700">
              - {skill}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Experience</h3>
        <ul>
          {user.experience.map((exp, index) => (
            <li key={index} className="mb-3">
              <span className="font-bold">{exp.role}</span> at {exp.company} -{" "}
              {exp.duration}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
