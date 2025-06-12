// src/services/UserWorkout.service.ts
import { UserWorkout, IUserWorkout } from "../models/UserWorkout";


export class UserWorkoutService {
  /**
   * Save workout plan data from N8N webhook response
   * @param stackauthUserId - User's Stack Auth ID
   * @param workoutData - The workout data from N8N webhook
   * @returns Saved workout plan or null if failed
   */
  async saveWorkoutPlan(
    stackauthUserId: string,
    workoutData: any
  ): Promise<IUserWorkout | null> {
    try {
      // Extract data from the N8N response format
      const workoutPlanData = Array.isArray(workoutData)
        ? workoutData[0]
        : workoutData;

      if (
        !workoutPlanData ||
        !workoutPlanData.userInfo ||
        !workoutPlanData.weeklySchedule
      ) {
        throw new Error("Invalid workout data structure");
      }

      // Generate unique plan ID
      const planId = `plan_${stackauthUserId}_${Date.now()}`;

      // Check if user has an active plan - if so, archive it
      await this.archiveActivePlans(stackauthUserId);

      // Prepare workout plan data for MongoDB
      const workoutPlan = new UserWorkout({
        stackauthUserId,
        planId,
        planName: `Workout Plan - ${new Date().toLocaleDateString()}`,
        userInfo: {
          workoutFrequency: workoutPlanData.userInfo.workoutFrequency,
          preferredWorkoutTime: workoutPlanData.userInfo.preferredWorkoutTime,
          workoutDuration: workoutPlanData.userInfo.workoutDuration,
          fitnessGoals: workoutPlanData.userInfo.fitnessGoals || [],
          injuries: workoutPlanData.userInfo.injuries || [],
          medicalConditions: workoutPlanData.userInfo.medicalConditions || [],
        },
        weeklySchedule: workoutPlanData.weeklySchedule.map((day: any) => ({
          day: day.day,
          type: day.type,
          focus: day.focus,
          exercises: day.exercises.map((exercise: any) => ({
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            duration: exercise.duration,
            weight: exercise.weight,
            restTime: exercise.restTime,
            notes: exercise.notes,
          })),
        })),
        modifications: {
          forMedicalConditions:
            workoutPlanData.modifications?.forMedicalConditions || [],
          forInjuries: workoutPlanData.modifications?.forInjuries || [],
        },
        recoveryPlan: {
          restDays: workoutPlanData.recoveryPlan?.restDays || [],
          recoveryTips: workoutPlanData.recoveryPlan?.recoveryTips || [],
        },
        planStatus: "active",
        generatedBy: "n8n",
        generationData: {
          timestamp: new Date(),
          version: "1.0",
          parameters: {
            source: "n8n_webhook",
            originalData: workoutPlanData,
          },
        },
      });

      // Save to database
      const savedPlan = await workoutPlan.save();

      console.log(
        `✅ Workout plan saved for user ${stackauthUserId}, Plan ID: ${planId}`
      );
      return savedPlan;
    } catch (error) {
      console.error("❌ Error saving workout plan:", error);
      return null;
    }
  }

  /**
   * Archive all active plans for a user
   * @param stackauthUserId - User's Stack Auth ID
   */
  private async archiveActivePlans(stackauthUserId: string): Promise<void> {
    try {
      await UserWorkout.updateMany(
        { stackauthUserId, planStatus: "active" },
        {
          planStatus: "archived",
          endDate: new Date(),
        }
      );
    } catch (error) {
      console.error("Error archiving active plans:", error);
    }
  }

  /**
   * Get active workout plan for a user
   * @param stackauthUserId - User's Stack Auth ID
   * @returns Active workout plan or null
   */
  async getActivePlan(stackauthUserId: string): Promise<IUserWorkout | null> {
    try {
      return await UserWorkout.findOne({
        stackauthUserId,
        planStatus: "active",
      }).sort({ createdAt: -1 });
    } catch (error) {
      console.error("Error getting active plan:", error);
      return null;
    }
  }

  /**
   * Get all workout plans for a user
   * @param stackauthUserId - User's Stack Auth ID
   * @param limit - Number of plans to return
   * @returns Array of workout plans
   */
  async getUserPlans(
    stackauthUserId: string,
    limit: number = 10
  ): Promise<IUserWorkout[]> {
    try {
      return await UserWorkout.find({ stackauthUserId })
        .sort({ createdAt: -1 })
        .limit(limit);
    } catch (error) {
      console.error("Error getting user plans:", error);
      return [];
    }
  }

  /**
   * Mark a workout as completed
   * @param stackauthUserId - User's Stack Auth ID
   * @param planId - Plan ID
   * @param day - Day of the workout
   * @param actualDuration - Actual duration in minutes
   * @param rating - User rating (1-5)
   * @param notes - User notes
   */
  async markWorkoutCompleted(
    stackauthUserId: string,
    planId: string,
    day: string,
    actualDuration?: number,
    rating?: number,
    notes?: string
  ): Promise<boolean> {
    try {
      const result = await UserWorkout.updateOne(
        {
          stackauthUserId,
          planId,
          "weeklySchedule.day": day,
        },
        {
          $set: {
            "weeklySchedule.$.completed": true,
            "weeklySchedule.$.completedAt": new Date(),
            "weeklySchedule.$.actualDuration": actualDuration,
            "weeklySchedule.$.userRating": rating,
            "weeklySchedule.$.notes": notes,
            lastWorkoutDate: new Date(),
          },
          $inc: {
            completedWorkouts: 1,
          },
        }
      );

      // Update adherence rate
      if (result.modifiedCount > 0) {
        await this.updateAdherenceRate(stackauthUserId, planId);
      }

      return result.modifiedCount > 0;
    } catch (error) {
      console.error("Error marking workout completed:", error);
      return false;
    }
  }

  /**
   * Update adherence rate for a workout plan
   * @param stackauthUserId - User's Stack Auth ID
   * @param planId - Plan ID
   */
  private async updateAdherenceRate(
    stackauthUserId: string,
    planId: string
  ): Promise<void> {
    try {
      const plan = await UserWorkout.findOne({ stackauthUserId, planId });
      if (plan && plan.totalWorkouts > 0) {
        const adherenceRate = Math.round(
          (plan.completedWorkouts / plan.totalWorkouts) * 100
        );
        await UserWorkout.updateOne(
          { stackauthUserId, planId },
          { adherenceRate }
        );
      }
    } catch (error) {
      console.error("Error updating adherence rate:", error);
    }
  }

  /**
   * Get workout statistics for a user
   * @param stackauthUserId - User's Stack Auth ID
   * @returns Workout statistics
   */
  async getWorkoutStats(stackauthUserId: string) {
    try {
      const stats = await UserWorkout.aggregate([
        { $match: { stackauthUserId } },
        {
          $group: {
            _id: "$stackauthUserId",
            totalPlans: { $sum: 1 },
            totalCompletedWorkouts: { $sum: "$completedWorkouts" },
            totalPossibleWorkouts: { $sum: "$totalWorkouts" },
            averageAdherence: { $avg: "$adherenceRate" },
            activePlans: {
              $sum: {
                $cond: [{ $eq: ["$planStatus", "active"] }, 1, 0],
              },
            },
          },
        },
      ]);

      return stats.length > 0 ? stats[0] : null;
    } catch (error) {
      console.error("Error getting workout stats:", error);
      return null;
    }
  }
}
