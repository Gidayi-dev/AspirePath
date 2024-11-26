import multer from "multer";
import path from "path";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// Set up file storage with multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Path where the file will be saved (make sure 'uploads' folder exists)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File name with timestamp
  },
});

// Multer configuration
const upload = multer({ storage: storage });

// Controller to handle file upload
export const uploadResume = upload.single("resume"); // 'resume' is the field name for file input

// Route to upload resume
export const handleResumeUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Get the userId from JWT or session
    const userId = req.userId; // Assuming you have a middleware to attach userId from token

    const filePath = req.file.path; // Path to the uploaded resume file

    // Update the user's profile with the resume file path
    await client.user.update({
      where: { id: userId },
      data: {
        resume: filePath, // Save the resume path in the 'resume' field
      },
    });

    res.status(200).json({ message: "Resume uploaded successfully", filePath });
  } catch (err) {
    console.error("Error uploading resume:", err);
    res.status(500).json({ message: "Error uploading resume" });
  }
};
