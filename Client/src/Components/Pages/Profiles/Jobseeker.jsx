import React from "react";

function JobSeekerProfile() {
  const user = {
    name: "Millyannah Gidayi",
    email: "millyannahi@gmail.com",
    bio: "Aspiring software developer with a passion for full-stack development.",
    skills: ["JavaScript", "React", "Python", "Docker"],
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">{user.name}</h2>
      <p className="text-gray-700">Email: {user.email}</p>
      <p className="text-gray-700">{user.bio}</p>
      <h3 className="text-2xl mt-4">Skills:</h3>
      <ul>
        {user.skills.map((skill, idx) => (
          <li key={idx}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default JobSeekerProfile;
