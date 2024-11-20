import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      role,
      companyName,
      companyDescription,
    } = req.body;

    // Validate input fields
    if (!username || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Normalize the role to uppercase to avoid mismatches
    const normalizedRole = role.toUpperCase();

    // Validate role (only accepting JOBSEEKER or EMPLOYER)
    if (normalizedRole !== "JOBSEEKER" && normalizedRole !== "EMPLOYER") {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Additional validation for EMPLOYER role to include company-related details
    if (normalizedRole === "EMPLOYER") {
      if (!companyName || !companyDescription) {
        return res.status(400).json({
          message: "Company name and description are required for employers.",
        });
      }

      // Create a new employer user with company details
      const newUser = await client.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: normalizedRole,
          companyName,
          companyDescription,
        },
      });

      return res.status(201).json(newUser);
    }

    // Create a new job-seeker user
    const newUser = await client.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: normalizedRole,
      },
    });

    // Return the new user object
    return res.status(201).json(newUser);
  } catch (e) {
    console.error("Error during registration:", e);
    return res.status(500).json({ message: e.message });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch user data
    const user = await client.user.findUnique({
      where: { id: Number(userId) },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return different profile information based on role
    const profileData = {
      username: user.username,
      email: user.email,
      role: user.role,
    };

    // Add company-specific data if the user is an employer
    if (user.role === "EMPLOYER") {
      profileData.companyName = user.companyName;
      profileData.companyDescription = user.companyDescription;
    }

    // Add job-seeker specific data if the user is a job seeker
    if (user.role === "JOBSEEKER") {
      profileData.skills = user.skills || []; // Example: Job seeker skills or experience
      profileData.experience = user.experience || []; // Example: Work experience
    }

    res.status(200).json(profileData);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Error fetching profile." });
  }
};
