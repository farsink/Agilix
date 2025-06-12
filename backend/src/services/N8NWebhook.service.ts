import axios from "axios";
import { UserProfile } from "../models/UserProfile";
import statustrackingService from "./statustracking.service";
import { UserWorkoutService } from "./userworkout.service";

export class N8NWebhookService {
  private n8nWebhookUrl: string;
  private userWorkoutService: UserWorkoutService;

  constructor() {
    // Get the webhook URL from environment variables
    this.n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || "";
    this.userWorkoutService = new UserWorkoutService();

    if (!this.n8nWebhookUrl) {
      console.warn("N8N_WEBHOOK_URL is not set in environment variables");
    }
  }

  /**
   * Send user profile data to N8N automation
   * @param userProfile The user profile data to send
   * @param eventType The type of event (e.g., 'profile_created', 'profile_updated')
   */
  public async sendProfileData(
    userProfile: any,
    eventType: string,
    processId: string
  ): Promise<boolean> {
    try {
      if (!this.n8nWebhookUrl) {
        console.error("Cannot send webhook: N8N_WEBHOOK_URL is not configured");
        return false;
      }
      statustrackingService.updateStatus(processId, "N8N_PROCESSING", 50);

      // Prepare the payload to send to N8N
      const payload = {
        event: eventType,
        timestamp: new Date().toISOString(),
        userProfile: {
          userId: userProfile.stackauthUserId,
          bodyMetrics: userProfile.bodyMetrics,
          fitnessProfile: userProfile.fitnessProfile,
          equipment: userProfile.equipment,
        },
      };

      // Send the data to N8N webhook
      const response = await axios.post(this.n8nWebhookUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Record the webhook call in the user profile
      await this.recordWebhookHistory(
        userProfile,
        eventType,
        response.status === 200 ? "success" : "failed",
        payload
      );
      statustrackingService.updateStatus(processId, "N8N_SUCCESS", 80);

      console.log(
        `N8N webhook sent successfully for user ${userProfile.stackauthUserId}`,
        {
          event: eventType,
          status: response.status,
        }
      );
      if (response.data && response.status === 200) {
        await this.handleWorkoutDataResponse(
          userProfile.stackauthUserId,
          response.data
        );
      }

      console.log(response.data);

      statustrackingService.updateStatus(processId, "COMPLETED", 100);

      return response.status === 200;
    } catch (error) {
      console.error("Error sending data to N8N webhook:", error);
      statustrackingService.updateStatus(processId, "N8N_FAILED", 100);
      // Record the failed webhook call
      await this.recordWebhookHistory(userProfile, eventType, "failed", {
        error: (error as Error).message,
      });

      return false;
    }
  }
  /**
   * Handle workout data response from N8N
   * @param stackauthUserId User's Stack Auth ID
   * @param responseData Response data from N8N
   */
  private async handleWorkoutDataResponse(
    stackauthUserId: string,
    responseData: any
  ): Promise<void> {
    try {
      // Check if response contains workout plan data
      if (this.isWorkoutData(responseData)) {
        console.log(`📋 Workout data received for user ${stackauthUserId}`);

        // Save the workout plan
        const savedPlan = await this.userWorkoutService.saveWorkoutPlan(
          stackauthUserId,
          responseData
        );

        if (savedPlan) {
          console.log(
            `✅ Workout plan saved successfully: ${savedPlan.planId}`
          );

          // Update user profile with workout plan generation timestamp
          await this.updateUserProfileWithWorkoutData(
            stackauthUserId,
            savedPlan.planId
          );
        } else {
          console.error(
            `❌ Failed to save workout plan for user ${stackauthUserId}`
          );
        }
      } else {
        console.log(
          `ℹ️ Response does not contain workout data for user ${stackauthUserId}`
        );
      }
    } catch (error) {
      console.error("Error handling workout data response:", error);
    }
  }

  /**
   * Check if response data contains workout information
   * @param data Response data to check
   * @returns boolean indicating if data contains workout information
   */
  private isWorkoutData(data: any): boolean {
    if (!data) return false;

    // Check if it's an array with workout data
    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];
      return (
        firstItem.userInfo &&
        firstItem.weeklySchedule &&
        Array.isArray(firstItem.weeklySchedule) &&
        firstItem.weeklySchedule.length > 0
      );
    }

    // Check if it's a single workout object
    return (
      data.userInfo &&
      data.weeklySchedule &&
      Array.isArray(data.weeklySchedule) &&
      data.weeklySchedule.length > 0
    );
  }

  /**
   * Update user profile with workout plan generation data
   * @param stackauthUserId User's Stack Auth ID
   * @param planId Generated plan ID
   */
  private async updateUserProfileWithWorkoutData(
    stackauthUserId: string,
    planId: string
  ): Promise<void> {
    try {
      await UserProfile.findOneAndUpdate(
        { stackauthUserId },
        {
          $set: {
            "aiProcessingData.workoutPlanGenerated": new Date(),
            "aiProcessingData.lastWorkoutPlanId": planId,
          },
          $push: {
            "aiProcessingData.n8nWebhookHistory": {
              timestamp: new Date(),
              type: "workout_generation",
              status: "success",
              data: { planId },
            },
          },
        }
      );
    } catch (error) {
      console.error("Error updating user profile with workout data:", error);
    }
  }

  /**
   * Record webhook call history in the user profile
   */
  private async recordWebhookHistory(
    userProfile: any,
    type: string,
    status: "success" | "failed" | "pending",
    data: any
  ): Promise<void> {
    try {
      // Map the event type to the expected enum values in the schema
      let webhookType:
        | "body_analysis"
        | "workout_generation"
        | "plan_adjustment";

      switch (type) {
        case "profile_created":
        case "profile_updated":
          webhookType = "body_analysis";
          break;
        case "workout_generated":
          webhookType = "workout_generation";
          break;
        case "plan_adjusted":
          webhookType = "plan_adjustment";
          break;
        default:
          webhookType = "body_analysis";
      }

      // Update the user profile with the webhook history
      const update = await UserProfile.findOneAndUpdate(
        { stackauthUserId: userProfile.stackauthUserId },
        {
          $push: {
            "aiProcessingData.n8nWebhookHistory": {
              timestamp: new Date(),
              type: webhookType,
              status: status,
              data: data,
            },
          },
        }
      );
    } catch (error) {
      console.error("Error recording webhook history:", error);
    }
  }
}
