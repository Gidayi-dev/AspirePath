// import express from 'express';
// import { PrismaClient } from '@prisma/client';
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcryptjs';
// import cookieParser from 'cookie-parser';

// const app = express();
// const prisma = new PrismaClient();
// const JWT_SECRET = "your_secret_key";

// app.use(express.json());
// app.use(cookieParser());

// // User registration route
// app.post("/users", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if the email already exists
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     // Hash the password before saving it to the database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword
//       },
//     });

//     // Do not send password in the response for security reasons
//     res.status(201).json({
//       id: newUser.id,
//       username: newUser.username,
//       email: newUser.email,
//       password: newUser.password
//     });
//   } catch (error) {
//     console.error("Error during user registration:", error); // More detailed error logging
//     res.status(500).json({ message: "Something went wrong during registration" });
//   }
// });

// // User login route
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare the entered password with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     // Generate a JWT token with user ID
//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

//     // Set the token in the cookie for session management
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Ensure cookies are only sent over HTTPS in production
//       maxAge: 3600000, // Token expires in 1 hour
//       sameSite: "Strict",
//     });

//     // Return the user info excluding the password
//     res.status(200).json({
//       message: "Login successful",
//       user: { id: user.id, username: user.username, email: user.email },
//     });
//   } catch (error) {
//     console.error(error);  // Log error for debugging
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Start server
// app.listen(4000, () => console.log("Server running on http://localhost:4000"));
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { registerUser } from "./controllers/users.controllers.js";
import { LogInUser } from "./controllers/auth.controllers.js";
import {
  createJob,
  fetchSingleJob,
  fetchAllJobs,
  getUserJobs,
  deleteJob,
  updateJob,
} from "./controllers/jobs.contollers.js";
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

app.post("/users", validateUserInformation, registerUser);
app.post("/auth/Login", LogInUser);
app.post("/jobs", verifyToken, validateJob, createJob);
app.get("/jobs/user", verifyToken, getUserJobs);
app.get("/jobs/:id", verifyToken, fetchSingleJob);
app.get("/jobs", verifyToken, fetchAllJobs);
app.delete("/jobs/:jobId", verifyToken, deleteJob);
app.put("/jobs/:jobId", verifyToken, validateJob, updateJob);

app.listen(4000, () => console.log("Server running...."));
