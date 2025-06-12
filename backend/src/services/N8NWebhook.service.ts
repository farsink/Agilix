import axios from "axios";
import { UserProfile } from "../models/UserProfile";

export class N8NWebhookService {
  private n8nWebhookUrl: string;

  constructor() {
    // Get the webhook URL from environment variables
    this.n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || "";

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
    eventType: string
  ): Promise<boolean> {
    try {
      if (!this.n8nWebhookUrl) {
        console.error("Cannot send webhook: N8N_WEBHOOK_URL is not configured");
        return false;
      }

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
      console.log("response", response.data);

      console.log(
        `N8N webhook sent successfully for user ${userProfile.stackauthUserId}`,
        {
          event: eventType,
          status: response.status,
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error("Error sending data to N8N webhook:", error);

      // Record the failed webhook call
      await this.recordWebhookHistory(userProfile, eventType, "failed", {
        error: (error as Error).message,
      });

      return false;
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
