import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function createJob(req, res) {
  try {
    const { title, location, company, type, description } = req.body;
    const userId = req.userId; // Assumes `verifyToken` middleware sets this

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newJob = await prisma.job.create({
      data: {
        title,
        location,
        company,
        type,
        description,
        owner: { connect: { id: userId } }, // Correctly linking user to job
      },
    });

    res.status(201).json(newJob);
  } catch (e) {
    console.error("Error creating a job post:", e);
    res.status(500).json({ message: "Failed to create job post." });
  }
}

export async function fetchSingleJob(req, res) {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: { owner: true }, // Includes owner details
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json(job);
  } catch (e) {
    console.error("Error fetching single job:", e);
    res.status(500).json({ message: "Failed to fetch job details." });
  }
}

export async function fetchAllJobs(req, res) {
  try {
    const jobs = await prisma.job.findMany({
      include: { owner: true }, // Correct field to include owner details
    });

    res.status(200).json(jobs);
  } catch (e) {
    console.error("Error fetching all jobs:", e);
    res.status(500).json({ message: "Failed to fetch jobs." });
  }
}

export async function getUserJobs(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const jobs = await prisma.job.findMany({
      where: { ownerId: userId }, // Correct condition
    });

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this user." });
    }

    res.status(200).json(jobs);
  } catch (e) {
    console.error("Error fetching user jobs:", e);
    res.status(500).json({ message: "Failed to fetch user jobs." });
  }
}

export async function deleteJob(req, res) {
  try {
    const { jobId } = req.params;
    const userId = req.userId;

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job || job.ownerId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this job." });
    }

    await prisma.job.delete({ where: { id: jobId } });
    res.status(200).json({ message: "Job deleted successfully." });
  } catch (e) {
    console.error("Error deleting job:", e);
    res.status(500).json({ message: "Failed to delete job." });
  }
}

export async function updateJob(req, res) {
  try {
    const { jobId } = req.params;
    const { title, location, company, type, description } = req.body;
    const userId = req.userId;

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job || job.ownerId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this job." });
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: { title, location, company, type, description },
    });

    res.status(200).json(updatedJob);
  } catch (e) {
    console.error("Error updating job:", e);
    res.status(500).json({ message: "Failed to update job." });
  }
}

export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.userId;

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    const existingApplication = await prisma.application.findFirst({
      where: { jobId, userId },
    });

    if (existingApplication) {
      return res.status(409).json({ message: "Already applied to this job." });
    }

    const application = await prisma.application.create({
      data: { jobId, userId },
    });

    const jobPoster = await prisma.user.findUnique({
      where: { id: ownerId, username: username, email: email },
    });

    if (jobPoster) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // Use environment variables
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: jobPoster.email,
        subject: "New Job Application",
        text: `Hello ${jobPoster.name},\n\nYou have a new application for your job "${job.title}".`,
      };

      // transporter.sendMail(mailOptions, (err, info) => {
      //   if (err) console.error("Email error:", err);
      // });
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Email error:", err);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      });
    }

    res.status(201).json(application);
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Failed to apply for job." });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const userId = req.userId;

    const applications = await prisma.application.findMany({
      where: { userId },
      include: { job: true },
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications." });
  }
};
