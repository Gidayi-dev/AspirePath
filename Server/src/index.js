import express from 'express';
import bcrypt from 'bcryptjs';  // bcrypt for password hashing
import { PrismaClient } from '@prisma/client';  // Prisma client for DB interaction

const app = express();
const prisma = new PrismaClient();  // Instantiate Prisma Client

app.use(express.json());  // Middleware to parse JSON request body

// User registration route
app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;  // Destructure user data from request

  // Validate input fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,  // Save the hashed password
      },
    });

    // Send back the created user's data (without password)
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong, please try again." });
  }
});

// Start the server
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
