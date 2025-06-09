import { Request, Response } from "express";
import prisma from "../config/database_Sql";

export const isRegistered = async (req: Request, res: Response) => {
  const { id } = req.params; // Extract stackauthUserId from URL parameters

  try {
    // Find the user by stackauthUserId
    const user = await prisma.user.findUnique({
      where: { stackauthUserId: id },
    });

    if (!user) {
      res.status(250).json({ success: false, message: "User not found" });
      return;
    }

    // Return the isRegistered status
    res.status(200).json({ success: true, isRegistered: user?.isRegistered });
  } catch (error) {
    console.error("Error checking registration status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
