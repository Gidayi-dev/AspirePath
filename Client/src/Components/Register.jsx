import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NavBar from "./Navbar";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // New state for role
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!username || !email || !password || !confirmPassword || !role) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Log the role to debug the value before submission
      console.log("Selected Role: ", role);

      // Make API call to backend to register the user with role
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }), // Include role
      });

      const data = await response.json();

      // Handle the response
      if (response.ok) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/Login"); // Redirect to login after 2 seconds
        }, 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Something went wrong. Please try again.");
    }

    // Reset form fields after submission
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole(""); // Reset role
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-80 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

          {/* Displaying success or error message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}

          {/* Registration form */}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Role selection dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              >
                <option value="">Select your role</option>
                <option value="JOBSEEKER">Job Seeker</option>
                <option value="EMPLOYER">Employer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Register
            </button>
          </form>

          {/* Redirect to login link */}
          <p className="mt-4 text-gray-500 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
