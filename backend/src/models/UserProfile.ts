// src/models/mongodb/UserProfile.ts
import { Schema, model, Document, Types } from "mongoose";

interface IUserProfile extends Document {
  userId: string; // Reference to PostgreSQL User.id
  stackauthUserId: string; // Reference to PostgreSQL User.stackauthUserId

  // Body Metrics
  bodyMetrics: {
    currentWeight?: number;
    targetWeight?: number;
    height?: number;
    bodyFatPercentage?: number;
    muscleMass?: number;
    measurements?: {
      chest?: number;
      waist?: number;
      hips?: number;
      arms?: number;
      thighs?: number;
    };
    lastUpdated: Date;
  };

  // Fitness Profile
  fitnessProfile: {
    experience: "beginner" | "intermediate" | "advanced";
    activityLevel:
      | "sedentary"
      | "lightly_active"
      | "moderately_active"
      | "very_active";
    workoutFrequency: number; // days per week
    preferredWorkoutTime: "morning" | "afternoon" | "evening" | "flexible";
    workoutDuration: number; // minutes
    fitnessGoals: string[]; // weight_loss, muscle_gain, strength, endurance, etc.
    injuries?: string[];
    medicalConditions?: string[];
  };

  // Equipment & Environment
  equipment: {
    hasGym: boolean;
    homeEquipment: string[]; // References to Equipment collection
    preferredWorkoutSpace: "home" | "gym" | "outdoor" | "mixed";
    spaceConstraints?: {
      size: "small" | "medium" | "large";
      noiseRestrictions?: boolean;
      timeConstraints?: string[];
    };
  };

  // Progress Tracking
  progressMetrics: {
    startDate: Date;
    currentStreak: number;
    longestStreak: number;
    totalWorkouts: number;
    totalWorkoutTime: number; // minutes
    averageWorkoutRating: number;
    lastWorkoutDate?: Date;
  };

  // AI Processing Data
  aiProcessingData: {
    lastBodyAnalysis?: Date;
    bodyAnalysisResults?: any;
    workoutPlanGenerated?: Date;
    planAdjustments: number;
    n8nWebhookHistory: {
      timestamp: Date;
      type: "body_analysis" | "workout_generation" | "plan_adjustment";
      status: "success" | "failed" | "pending";
      data?: any;
    }[];
  };

  createdAt: Date;
  updatedAt: Date;
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    stackauthUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    bodyMetrics: {
      currentWeight: Number,
      targetWeight: Number,
      height: Number,
      bodyFatPercentage: Number,
      muscleMass: Number,
      measurements: {
        chest: Number,
        waist: Number,
        hips: Number,
        arms: Number,
        thighs: Number,
      },
      lastUpdated: { type: Date, default: Date.now },
    },

    fitnessProfile: {
      experience: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner",
      },
      activityLevel: {
        type: String,
        enum: [
          "sedentary",
          "lightly-active",
          "moderately-active",
          "very-active",
        ],
        default: "lightly_active",
      },
      workoutFrequency: { type: Number, default: 3 },
      preferredWorkoutTime: {
        type: String,
        enum: ["morning", "afternoon", "evening", "flexible"],
        default: "flexible",
      },
      workoutDuration: { type: Number, default: 45 },
      fitnessGoals: [{ type: String }],
      injuries: [{ type: String }],
      medicalConditions: [{ type: String }],
    },

    equipment: {
      hasGym: { type: Boolean, default: false },
      homeEquipment: [{ type: String }],
      preferredWorkoutSpace: {
        type: String,
        enum: ["home", "gym", "outdoor", "mixed"],
        default: "home",
      },
      spaceConstraints: {
        size: {
          type: String,
          enum: ["small", "medium", "large"],
          default: "medium",
        },
        noiseRestrictions: { type: Boolean, default: false },
        timeConstraints: [{ type: String }],
      },
    },

    progressMetrics: {
      startDate: { type: Date, default: Date.now },
      currentStreak: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      totalWorkouts: { type: Number, default: 0 },
      totalWorkoutTime: { type: Number, default: 0 },
      averageWorkoutRating: { type: Number, default: 0 },
      lastWorkoutDate: Date,
    },

    aiProcessingData: {
      lastBodyAnalysis: Date,
      bodyAnalysisResults: Schema.Types.Mixed,
      workoutPlanGenerated: Date,
      planAdjustments: { type: Number, default: 0 },
      n8nWebhookHistory: [
        {
          timestamp: { type: Date, default: Date.now },
          type: {
            type: String,
            enum: ["body_analysis", "workout_generation", "plan_adjustment"],
          },
          status: {
            type: String,
            enum: ["success", "failed", "pending"],
            default: "pending",
          },
          data: Schema.Types.Mixed,
        },
      ],
    },
  },
  {
    timestamps: true,
    collection: "userprofiles",
  }
);

// Indexes for performance

userProfileSchema.index({ "progressMetrics.lastWorkoutDate": -1 });
userProfileSchema.index({ "aiProcessingData.lastBodyAnalysis": -1 });

export const UserProfile = model<IUserProfile>(
  "UserProfile",
  userProfileSchema
);
