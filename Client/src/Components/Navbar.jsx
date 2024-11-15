// Manages the top navigation bar with links to different sections like Home, Find Jobs, Post Job, About, Sign Up, and Login.
// Ensures easy navigation throughout the website.
import React from "react";
// import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="flex justify-between text-gray-500 h-14 bg-red-50">
            <div className="mt-2.5 text-2xl ml-3 font-bold">
                AspirePath
            </div>
            <div className="flex gap-10 text-2xl mt-2.5">
        <a href="#" className="hover:text-purple-300 ease-in-out duration-300">Home</a>
        <a href="#" className="hover:text-purple-300 ease-in-out duration-300">Find Jobs</a>
        <a href="#" className="hover:text-purple-300 ease-in-out duration-300">About</a>
        <a href="#" className="hover:text-purple-300 ease-in-out duration-300">Post Job</a>
        <a href="#" className="hover:text-purple-300 ease-in-out duration-300">Messages</a>
      </div>
      
      <div className="flex gap-10 text-2xl mt-2.5 mr-3">
        <a href="#" className="hover:text-yellow-900">Register</a>
        <a href="#" className="hover:text-yellow-900">Log In</a>
        </div>
        </nav>
    )
}
export default NavBar;