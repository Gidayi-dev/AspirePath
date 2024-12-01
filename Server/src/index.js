import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"; // Import the path module
import {
  registerUser,
  getUserProfile,
} from "./controllers/users.controllers.js";
import { LogInUser } from "./controllers/auth.controllers.js";
import {
  createJob,
  fetchSingleJob,
  fetchAllJobs,
  getUserJobs,
  deleteJob,
  updateJob,
  getUserApplications,
  applyForJob,
} from "./controllers/jobs.contollers.js";
import {
  uploadResume,
  handleResumeUpload,
} from "./controllers/uploadController.js";
import validateJob from "./middlewares/validateJob.js";
import validateUserInformation from "./middlewares/validateUserInformation.js";
import verifyToken from "./middlewares/verifyToken.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(cookieParser());

// User Routes
app.post("/users", validateUserInformation, registerUser);
app.post("/auth/Login", LogInUser);
app.get("/users/:id", verifyToken, getUserProfile); // Corrected route definition

// Job Routes
app.post("/jobs", verifyToken, validateJob, createJob);
app.get("/jobs/user", verifyToken, getUserJobs);
app.get("/jobs/:id", verifyToken, fetchSingleJob);
app.get("/jobs", verifyToken, fetchAllJobs);
app.delete("/jobs/:jobId", verifyToken, deleteJob);
app.put("/jobs/:jobId", verifyToken, validateJob, updateJob);

app.post("/upload-resume", uploadResume, handleResumeUpload); // Upload resume

// Application routes
app.post("/applications", verifyToken, applyForJob); // Apply for a job
app.get("/applications/user", verifyToken, getUserApplications);

// File Download Route
app.get("/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", filename);
  res.download(filePath); // Sends the file for download
});

// Catch-all route for unhandled requests (optional but useful)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(4000, () => console.log("Server running...."));
