// // Handles user registration for job seekers and employers.
// // Collects data like name, email, password, and account type.
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import apiBase from "../utils/api";
// import NavBar from "./Navbar";
// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleRegister = (e) => {
//     e.preventDefault();

//     if (!username || !email || !password || !confirmPassword) {
//       setError("Please fill in all fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await fetch({apiBase}, {
//         method: "POST",
//         headers: {
//           "content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, email, password }),
//       })
//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("Registration successful! Redirecting to Log in...");
//         setTimeout(() => navigate("/Login"), 2000);
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       console.error("Error during registration:", err);
//       setError("Something went wrong, please try again.")
//     }

//     console.log("Registering with:", { username, email, password });

//     setUsername("");
//     setEmail("");
//     setPassword("");
//     setConfirmPassword("");
//     setError("");

//     navigate("/login");
//   };

//   return (
//     <div>
//       <NavBar />
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-80 p-8 bg-white shadow-lg rounded-lg">
//           <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           <form onSubmit={handleRegister}>
//             <div className="mb-4">
//               <label className="block text-gray-700">Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none"
//                 placeholder="Enter your username"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700">Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none"
//                 placeholder="Confirm your password"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
//             >
//               Register
//             </button>
//           </form>
//           <p className="mt-4 text-gray-500 text-center">
//             Already have an account?{" "}
//             <a href="/login" className="text-blue-600">
//               Login
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NavBar from "./Navbar";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make API call to backend to register the user
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully registered user
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        // Handle errors (such as email already in use)
        setError(data.message);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Something went wrong, please try again.");
    }

    // Reset form fields after submission
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Register
            </button>
          </form>
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
