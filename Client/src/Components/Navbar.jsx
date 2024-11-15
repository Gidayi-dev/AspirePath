// Manages the top navigation bar with links to different sections like Home, Find Jobs, Post Job, About, Sign Up, and Login.
// Ensures easy navigation throughout the website.
import React from "react";
// import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="flex justify-between bg-gray-50 h-16">
            <div className="mt-2.5 text-2xl ml-3 font-bold">
                AspirePath
            </div>
        <div className="flex gap-10 text-2xl mt-2.5">
            <a href="#">Home</a>
            <a href="#">Find Jobs</a>
            <a href="#">About</a>
            <a href="#">Post Job</a>
            <a href="#">Messages</a>
        </div>
        <div className="flex gap-10 text-2xl mt-2.5">
            <a href="#">Register</a>
            <a href="#" className="mr-3">Log In</a>
        </div>
        </nav>
    )
}
export default NavBar;