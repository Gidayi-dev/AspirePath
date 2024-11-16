// Manages the top navigation bar with links to different sections like Home, Find Jobs, Post Job, About, Sign Up, and Login.
// Ensures easy navigation throughout the website.
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex justify-between items-center text-gray-700 h-14 bg-gray-100 shadow-lg">
      {/* Logo Section */}
      <div className="text-2xl ml-5 font-bold text-gray-800">AspirePath</div>

      {/* Navigation Links */}
      <div className="flex gap-10 text-xl">
        <Link to="/" className="hover:text-purple-500 ease-in-out duration-300">
          Home
        </Link>
        <Link
          to="/jobs"
          className="hover:text-purple-500 ease-in-out duration-300"
        >
          Find Jobs
        </Link>
        <Link
          to="/about"
          className="hover:text-purple-500 ease-in-out duration-300"
        >
          About
        </Link>
        <Link
          to="/post-job"
          className="hover:text-purple-500 ease-in-out duration-300"
        >
          Post Job
        </Link>
        <Link
          to="/messages"
          className="hover:text-purple-500 ease-in-out duration-300"
        >
          Messages
        </Link>
      </div>

      {/* Auth Links */}
      <div className="flex gap-10 text-xl mr-5">
        <Link
          to="/register"
          className="hover:text-yellow-900 ease-in-out duration-300"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="hover:text-yellow-900 ease-in-out duration-300"
        >
          Log In
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
