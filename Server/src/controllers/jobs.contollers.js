import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function createJob(req, res) {
  try {
    const { title, location, company, type, description } = req.body;
    const userId = req.userId; // Assumes `verifyToken` middleware sets this

    // Ensure the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newJob = await prisma.job.create({
      data: {
        title,
        location,
        company,
        type,
        description,
        owner: {
          connect: {
            id: userId, // Linking the user by userId
          },
        },
      },
    });

    res.status(201).json(newJob);
  } catch (e) {
    console.error("Error creating a job post:", e);
    res.status(500).json({ message: e.message });
  }
}

export async function fetchSingleJob(req, res) {
  try {
    const { id } = req.params;

    const job = await prisma.job.findFirst({
      where: { id },
      include: {
        owner: true,
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (e) {
    console.error("Error fetching single job:", e);
    res.status(500).json({ message: e.message });
  }
}

export async function fetchAllJobs(req, res) {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        user: true,
      },
    });

    res.status(200).json(jobs);
  } catch (e) {
    console.error("Error fetching all jobs:", e);
    res.status(500).json({ message: e.message });
  }
}

export async function getUserJobs(req, res) {
  try {
    const userId = req.userId;

    const jobs = await prisma.job.findMany({
      where: {
        owner: userId,
      },
    });

    res.status(200).json(jobs);
  } catch (e) {
    console.error("Error fetching user jobs:", e);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
}

export async function deleteJob(req, res) {
  try {
    const { jobId } = req.params;
    const userId = req.userId;

    await prisma.job.delete({
      where: {
        AND: [{ id: jobId }, { owner: userId }],
      },
    });

    res.status(200).json({ message: "Job deleted successfully." });
  } catch (e) {
    console.error("Error deleting job:", e);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
}

export async function updateJob(req, res) {
  try {
    const { jobId } = req.params;
    const { title, location, company, type, description } = req.body;
    const userId = req.userId;

    const job = await prisma.job.update({
      where: { id: jobId, owner: userId },
      data: { title, location, company, type, description },
    });

    res.status(200).json(job);
  } catch (e) {
    console.error("Error updating job:", e);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
}

export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.userId; // Assumes `verifyToken` middleware sets this

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the user has already applied
    const existingApplication = await prisma.application.findFirst({
      where: { jobId, userId },
    });

    if (existingApplication) {
      return res
        .status(409)
        .json({ message: "You have already applied for this job." });
    }

    // Create a new application
    const application = await prisma.application.create({
      data: {
        jobId,
        userId,
      },
    });

    // Send an email to the job poster
    const jobPoster = await prisma.user.findUnique({
      where: { id: job.ownerId }, // Assumes `ownerId` points to the employer
    });

    if (jobPoster) {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your-email@gmail.com", // Replace with your email
          pass: "your-email-password", // Replace with your email password or use App Password
        },
      });

      // Email content
      const mailOptions = {
        from: "your-email@gmail.com", // Replace with your email
        to: jobPoster.email, // Job poster's email
        subject: "New Job Application",
        text:
          `Hello ${jobPoster.name},\n\nYou have received a new application for your job posting "${job.title}" from ${req.user.name}.` +
          `\n\nApplicant Details:\nName: ${req.user.name}\nEmail: ${req.user.email}\n\nBest regards,\nJob Application System`,
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }

    res.status(201).json(application);
  } catch (error) {
    console.error("Error applying for job:", error);
    res
      .status(500)
      .json({ message: "An error occurred while applying for the job." });
  }
};

// Fetch applications for a user
export const getUserApplications = async (req, res) => {
  try {
    const userId = req.userId;

    const applications = await prisma.application.findMany({
      where: { userId },
      include: {
        job: true, // Include job details
      },
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching applications." });
  }
};
