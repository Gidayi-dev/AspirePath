// Login.jsx
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Define mutation for login
  const loginMutation = useMutation(
    async (loginData) => {
      const response = await fetch("http://localhost:4000/auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/profile"); // Redirect to profile/dashboard
        }, 2000);
      },
      onError: (err) => {
        setError(err.message || "Something went wrong. Please try again.");
      },
    },
  );

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Input validation
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    // Trigger mutation with login data
    loginMutation.mutate({ email, password });
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-80 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {/* Displaying error or success message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}

          <form onSubmit={handleLogin}>
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

            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-400"
            >
              Login
            </button>
          </form>

          {/* Link to the Register page */}
          <p className="mt-4 text-gray-500 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
