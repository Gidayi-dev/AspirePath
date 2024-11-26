import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export const registerUser = async (req, res) => {
  try {
    console.log("Received data:", req.body); // Add this to check the incoming data

    const { username, email, password, confirmPassword } = req.body;

    // Validate input fields
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await client.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Respond with the new user object (excluding sensitive information like password)
    const { password: _, ...userResponse } = newUser; // Remove the password from the response
    return res.status(201).json(userResponse);
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
      where: { id: userId }, // Ensure the ID is passed as a string or number depending on how your DB stores it
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return profile data without sensitive information like password
    const { password: _, ...profileData } = user; // Exclude password from the response
    res.status(200).json(profileData);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Error fetching profile." });
  }
};
