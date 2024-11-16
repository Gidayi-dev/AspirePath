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
import "./App.css";
import FindJobs from "./Components/Pages/FindJobs";
import About from "./Components/Pages/About";
import Messages from "./Components/Pages/Messages";
import PostJob from "./Components/PostJob";
import Profile from "./Components/Profile";

function App() {
  // State to manage user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<Home />} />
          <Route
            path="/Login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/Register" element={<Register />} />
          <Route path="/Findjobs" element={<FindJobs />} />
          <Route path="/About" element={<About />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/Postjob" element={<PostJob />} />

          {/* Protected Profile Route */}
          <Route
            path="/Profile"
            element={
              isAuthenticated ? <Profile /> : <Navigate to="/Login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
