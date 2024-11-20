import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Normalize the role to match the backend expectations

    // Validate role (accepting job-seeker and employer)
    if (role !== "JOBSEEKER" && role !== "EMPLOYER") {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user with the role (now stored in lowercase)
    const newUser = await client.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role, // Store normalized role
      },
    });

    // Return the new user object
    res.status(201).json(newUser);
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(500).json({ message: e.message });
  }
};
