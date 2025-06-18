import { N8NWebhookService } from "../services/N8NWebhook.service";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const webhookService = new N8NWebhookService();

// Mock user profile data
const mockUserProfile = {
  stackauthUserId: "test-user-123",
  bodyMetrics: {
    currentWeight: 70,
    height: 175,
    lastUpdated: new Date(),
  },
  fitnessProfile: {
    experience: "intermediate",
    activityLevel: "moderately_active",
    fitnessGoals: ["weight_loss", "muscle_gain"],
    workoutFrequency: 3,
    preferredWorkoutTime: "morning",
    workoutDuration: 45,
  },
  equipment: {
    hasGym: false,
    homeEquipment: ["dumbbells", "resistance_bands"],
    preferredWorkoutSpace: "home",
  },
};

// Test the webhook
async function testWebhook() {
  try {
    console.log("Testing N8N webhook connection...");
    console.log(`Using webhook URL: ${process.env.N8N_WEBHOOK_URL}`);

    const result = await webhookService.sendProfileData(
      mockUserProfile,
      "profile_created",
      "process_id"
    );

    console.log("Webhook test result:", result);
  } catch (error) {
    console.error("Webhook test failed:", error);
  }
}

testWebhook();
