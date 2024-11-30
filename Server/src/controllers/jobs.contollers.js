import { PrismaClient } from "@prisma/client";

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
    res.status(500).json({ message: "Error fetching jobs." });
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
