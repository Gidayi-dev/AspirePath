import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Pages/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import FindJobs from "./Components/Pages/FindJobs";
import About from "./Components/Pages/About";
import Messages from "./Components/Pages/Messages";
import PostJob from "./Components/PostJob";
import JobSeekerProfile from "./Components/Pages/Profiles/Jobseeker";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Login"
            element={<Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />}
          />
          <Route path="/Register" element={<Register />} />
          <Route path="/FindJobs" element={<FindJobs />} />
          <Route path="/About" element={<About />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/PostJob" element={<PostJob />} />

          {/* Role-Based Protected Routes */}
          <Route
            path="/JobSeekerProfile"
            element={
              isAuthenticated && role === "JOBSEEKER" ? (
                <JobSeekerProfile />
              ) : (
                <Navigate to="/Login" replace />
              )
            }
          />
          <Route
            path="/EmployerProfile"
            element={
              isAuthenticated && role === "EMPLOYER" ? (
                <EmployerProfile />
              ) : (
                <Navigate to="/Login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
