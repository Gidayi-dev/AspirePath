// // Provides a login form for existing users (job seekers or employers).
// // Handles authentication (e.g., using JWT).
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NavBar from "./Navbar";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     console.log("Logging in with:", { email, password });

//     if (email === "user@example.com" && password === "password123") {

//       localStorage.setItem("isAuthenticated", "true");
//       setError("");

//       navigate("/profile");
//     } else {
//       setError("Invalid email or password");
//     }

//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div>
//       <NavBar />
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-80 p-8 bg-white shadow-lg rounded-lg">
//           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           <form onSubmit={handleLogin}>
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
//             <div className="mb-6">
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
//             <button
//               type="submit"
//               className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
//             >
//               Login
//             </button>
//           </form>
//           <p className="mt-4 text-gray-500 text-center">
//             Don't have an account?{" "}
//             <a href="/register" className="text-blue-600">
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import apiBase from "../utils/api";
import NavBar from "./Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginMutation = useMutation(
    async (loginData) => {
      const response = await fetch(`${apiBase}/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
      return response.json();
    },
    {
      onSuccess: (data) => {
        console.log("Login successful:", data);
        navigate("/Profile");
      },
      onError: (err) => {
        setError(err.message || "Something went wrong. Please try again.");
      },
    }
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    loginMutation.mutate({ email, password })

    // try {
    //   const response = await fetch({ apiBase }/Login, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log("Login successful:", data);
    //     setError("");
    //     navigate("/Profile");
    //     setError("Invalid email or password");
    //   }
    // } catch (err) {
    //   setError("Something went wrong. Please try again.");
    // }

    // setEmail("");
    // setPassword("");
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-80 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
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
            <div className="mb-6">
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
              className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Login
            </button>
          </form>
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
