import { PrismaClient } from "@prisma/client";

export async function main() {
  const prisma = new PrismaClient();

  try {
    // Test the connection by creating a user
    const newUser = await prisma.user.create({
      data: {
        stackauthUserId: "12345",
        email: "p7Fg9@example.com",
      },
    });

    console.log("Connection successful!");
    console.log("Created user:", newUser);

    // Query all users to verify
    const allUsers = await prisma.user.findMany();
    console.log("All users:", allUsers);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}
