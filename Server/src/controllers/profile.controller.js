import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const User = require("../models/User"); // Assuming a User model is defined

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    // Assuming the user ID is stored in the session or retrieved from a JWT
    const userId = req.user?.id; // Adjust this based on your authentication method

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access. User not authenticated." });
    }

    // Fetch the user profile from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with the user's profile data
    return res.status(200).json({
      image: user.image,
      skills: user.skills,
      education: user.education,
      experience: user.experience,
      bio: user.bio,
      resume: user.resume,
      companyName: user.companyName,
      companyDescription: user.companyDescription,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Failed to fetch user profile. Please try again later." });
  }
};

module.exports = {
  getUserProfile,
};
