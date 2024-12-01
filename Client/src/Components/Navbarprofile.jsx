import React from "react";
import { Link } from "react-router-dom";

function NavBarProfile() {
  return (
    <nav className="flex justify-between items-center text-gray-700 h-14 bg-gray-100 shadow-lg">
      <div className="text-2xl ml-5 font-bold text-gray-800">AspirePath</div>

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
          to="/About"
          className="hover:text-purple-500 ease-in-out duration-300"
        >
          About
        </Link>
        <Link
          to="/Postjob"
          className="hover:text-purple-500 ease-in-out duration-300"
        >
          Post Job
        </Link>
        <Link
          to="/Messages"
          className="hover:text-purple-500 ease-in-out duration-300"
        >
          Messages
        </Link>
      </div>

      <div className="flex gap-10 text-xl mr-5">
        <Link to="/" className="hover:text-yellow-900 ease-in-out duration-300">
          Log Out
        </Link>
      </div>
    </nav>
  );
}

export default NavBarProfile;
