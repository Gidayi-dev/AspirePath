// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "react-query";
// import Home from "./Components/Pages/Home";
// import Login from "./Components/Login";
// import Register from "./Components/Register";
// import FindJobs from "./Components/Pages/FindJobs";
// import About from "./Components/Pages/About";
// import Messages from "./Components/Pages/Messages";
// import PostJob from "./Components/PostJob";
// import JobSeekerProfile from "./Components/Pages/Profiles/Jobseeker";
// import Profile from "./Components/Profile";
// import NavBarProfile from "./Components/Navbarprofile";

// const client = new QueryClient();

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Example of loading the authentication state from localStorage or an API
//     const authData = localStorage.getItem("authData");
//     if (authData) {
//       const parsedData = JSON.parse(authData);
//       setIsAuthenticated(parsedData.isAuthenticated);
//     }
//   }, []);

//   return (
//     <QueryClientProvider client={client}>
//       <Router>
//         <div className="App">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route
//               path="/Login"
//               element={
//                 <Login
//                   setIsAuthenticated={setIsAuthenticated}
//                 />
//               }
//             />
//             <Route path="/Register" element={<Register />} />
//             <Route path="/FindJobs" element={<FindJobs />} />
//             <Route path="/About" element={<About />} />
//             <Route path="/Messages" element={<Messages />} />
//             <Route path="/Profile" element={<Profile />} />
//             <Route path="/PostJob" element={<PostJob />} />

//             {/* Protected Routes */}
//             <Route
//               path="/JobSeekerProfile"
//               element={
//                 isAuthenticated ? (
//                   <JobSeekerProfile />
//                 ) : (
//                   <Navigate to="/Login" replace />
//                 )
//               }
//             />

//             {/* Fallback Route */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </div>
//       </Router>
//     </QueryClientProvider>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider, useAuth } from "./authContext/authContext";
import Home from "./Components/Pages/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import FindJobs from "./Components/Pages/FindJobs";
import About from "./Components/Pages/About";
import Messages from "./Components/Pages/Messages";
import PostJob from "./Components/PostJob";
import JobSeekerProfile from "./Components/Pages/Profiles/Jobseeker";
import Profile from "./Components/Profile";
import NavBarProfile from "./Components/Navbarprofile";
import NavBar from "./Components/Navbar"; // Make sure NavBar is imported
import JobDetails from "./Components/JobDetails";

const client = new QueryClient();

function App() {
  const { auth } = useAuth(); // Access authentication status from context

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Router>
          {/* Conditionally render the NavBar based on authentication */}
          {/* <NavBarProfile /> */}

          <Routes>
            {/* Define routes for different pages */}
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Findjobs" element={<FindJobs />} />
            <Route path="/About" element={<About />} />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Postjob" element={<PostJob />} />
            <Route path="/JobDetails/:jobId" element={<JobDetails />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
