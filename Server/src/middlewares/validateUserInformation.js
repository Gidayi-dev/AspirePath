import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function validateUserInformation(req, res, next) {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Please enter your name" });
  }

  if (!email) {
    return res.status(400).json({ message: "Please Enter your email address" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please set your password" });
  }

  try {
    const userWithEmail = await client.user.findFirst({
      where: { email: email },
    });

    if (userWithEmail) {
      return res.status(400).json({ message: "Email address already exists" });
    }

    next();
  } catch (error) {
    console.error("Error during validation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default validateUserInformation;
