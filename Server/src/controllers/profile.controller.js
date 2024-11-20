import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// Get user profile by ID
// export const getUserProfile = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     // Fetch user data
//     const user = await client.user.findUnique({
//       where: { id: Number(userId) },
//     });

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Return different profile information based on role
//     const profileData = {
//       username: user.username,
//       email: user.email,
//       role: user.role,
//     };

//     // Add company-specific data if the user is an employer
//     if (user.role === "EMPLOYER") {
//       profileData.companyName = user.companyName;
//       profileData.companyDescription = user.companyDescription;
//     }

//     // Add job-seeker specific data if the user is a job seeker
//     if (user.role === "JOBSEEKER") {
//       profileData.skills = user.skills || [];  // Example: Job seeker skills or experience
//       profileData.experience = user.experience || [];  // Example: Work experience
//     }

//     res.status(200).json(profileData);
//   } catch (err) {
//     console.error("Error fetching user profile:", err);
//     res.status(500).json({ message: "Error fetching profile." });
//   }
// };
