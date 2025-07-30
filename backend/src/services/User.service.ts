import { Request, Response } from 'express';
import prisma from '../config/database_Sql';

export const isRegistered = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract user ID from authenticated user
    const userId = req.user?.id;

    // Validate that user ID exists in session
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User ID not available in session',
      });
      return;
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
      return;
    }

    // Find the user by stackauthUserId
    const user = await prisma.user.findUnique({
      where: { stackauthUserId: userId },
      select: {
        isRegistered: true,
      },
    });

    // Handle user not found in database
    if (!user) {
      // Don't reveal user existence - return generic response
      res.status(404).json({
        success: false,
        message: 'Unable to verify registration status',
      });
      return;
    }

    // Return the isRegistered status
    res.status(200).json({
      success: true,
      isRegistered: user.isRegistered,
    });
  } catch (error) {
    console.error('Error checking registration status:', error);
    // Don't expose internal errors to client
    res.status(500).json({
      success: false,
      message: 'Unable to process request',
    });
  }
};

// In User.service.ts
export const updateUserAsRegistered = async (userId: string): Promise<boolean> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { 
        stackauthUserId: userId 
      },
      data: { 
        isRegistered: true,
        updatedAt: new Date()
      },
      select: {
        id: true,
        isRegistered: true
      }
    });
    
    return updatedUser.isRegistered;
  } catch (error) {
    console.error(`Failed to update registration status for user ${userId}:`, error);
    throw new Error('Database update for registration status failed');
  }
};
