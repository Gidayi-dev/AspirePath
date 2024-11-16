// Provides information about your platform, mission, and team.
// Helps build trust with users by explaining your service.
import React from "react";

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        About AspirePath
      </h2>
      <p className="text-lg text-gray-700 max-w-3xl text-center">
        Welcome to AspirePath! We are a platform dedicated to connecting job
        seekers with exciting job opportunities and helping employers find the
        best talent. Our mission is to bridge the gap between skilled
        professionals and great companies.
      </p>
      <p className="text-lg text-gray-700 max-w-3xl text-center mt-4">
        Whether you're looking for a remote, hybrid, or on-site job, we've got
        you covered. Our easy-to-use platform allows job seekers to filter jobs
        based on their preferences and find the perfect match for their skills
        and experience.
      </p>
    </div>
  );
}

export default About;
