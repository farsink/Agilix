import { UserProfile } from "../models/UserProfile";

export async function createUserProfileIfNotExists(
  user: any,
  stackauthUserId: string
) {
  const existingProfile = await UserProfile.findOne({ stackauthUserId });
  if (!existingProfile) {
    try {
      const userProfile = new UserProfile({
        userId: user.id, // PostgreSQL User.id
        stackauthUserId,
        bodyMetrics: {
          lastUpdated: new Date(),
        },
        fitnessProfile: {
          experience: "beginner",
          activityLevel: "lightly_active",
          workoutFrequency: 3,
          preferredWorkoutTime: "flexible",
          workoutDuration: 45,
          fitnessGoals: [],
        },
        equipment: {
          hasGym: false,
          homeEquipment: [],
          preferredWorkoutSpace: "home",
        },
        progressMetrics: {
          startDate: new Date(),
          currentStreak: 0,
          longestStreak: 0,
          totalWorkouts: 0,
          totalWorkoutTime: 0,
          averageWorkoutRating: 0,
        },
        aiProcessingData: {
          planAdjustments: 0,
          n8nWebhookHistory: [],
        },
      });
      await userProfile.save();
    } catch (error) {
      console.error("Error creating user mongo profile:", error);
      throw new Error("Failed to create user profile");
    }
  }
}
