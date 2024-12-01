import React from "react";
import NavBar from "../Navbar";

function About() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-10">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full animate-fade-in">
          <h2 className="text-5xl font-extrabold text-blue-600 mb-6 text-center animate-slide-down">
            About AspirePath
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            Welcome to{" "}
            <span className="font-semibold text-blue-500">AspirePath</span>! We
            are a platform dedicated to connecting job seekers with exciting job
            opportunities and helping employers find the best talent. Our
            mission is to bridge the gap between skilled professionals and great
            companies.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed text-center mt-4">
            Whether you're looking for a remote, hybrid, or on-site job, we've
            got you covered. Our easy-to-use platform allows job seekers to
            filter jobs based on their preferences and find the perfect match
            for their skills and experience.
          </p>
          <div className="mt-8 flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
