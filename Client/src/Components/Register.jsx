import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Added error state for handling errors
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Mutation to handle registration
  const registerMutation = useMutation(
    async (registerData) => {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (err) {
        throw new Error("Server response was not in JSON format.");
      }

      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed.");
      }

      return responseData;
    },
    {
      onSuccess: (data) => {
        console.log("Registration successful:", data);
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      },
      onError: (err) => {
        console.error("Error:", err.message);
        setError(err.message || "Something went wrong. Please try again.");
      },
    },
  );

  const handleRegister = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccessMessage(""); // Clear success message

    // Debugging states
    console.log({
      username,
      email,
      password,
      confirmPassword,
    });

    // Validation checks
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Proceed with mutation
    console.log("All fields are valid. Proceeding to register...");
    registerMutation.mutate({
      username,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-80 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}

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
            <div className="mb-4">
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
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              Register
            </button>
            <p className="mt-4 text-gray-500 text-center">
              Already have an account?{" "}
              <a href="/Login" className="text-blue-600">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
