// src/models/UserWorkout.ts
import { Schema, model, Document } from "mongoose";

// Interface for individual exercises
interface IExercise {
  name: string;
  sets?: number;
  reps?: number | string; // Can be number or "AMRAP"
  duration?: string; // For time-based exercises
  weight?: number;
  restTime?: number; // in seconds
  notes?: string;
}

// Interface for daily workout
interface IDailyWorkout {
  day: string;
  type:
    | "Strength"
    | "Endurance"
    | "Full Body"
    | "Rest"
    | "HIIT"
    | "Circuit Training";
  focus: string;
  exercises: IExercise[];
  completed?: boolean;
  completedAt?: Date;
  actualDuration?: number; // in minutes
  userRating?: number; // 1-5 scale
  notes?: string;
}

// Interface for user info within workout plan
interface IWorkoutUserInfo {
  workoutFrequency: number;
  preferredWorkoutTime: "morning" | "afternoon" | "evening" | "flexible";
  workoutDuration: number;
  fitnessGoals: string[];
  injuries: string[];
  medicalConditions: string[];
}

// Interface for modifications
interface IModifications {
  forMedicalConditions: string[];
  forInjuries: string[];
}

// Interface for recovery plan
interface IRecoveryPlan {
  restDays: string[];
  recoveryTips: string[];
}

// Main UserWorkout interface
export interface IUserWorkout extends Document {
  stackauthUserId: string;
  planId: string; // Unique identifier for this workout plan
  planName?: string;
  userInfo: IWorkoutUserInfo;
  weeklySchedule: IDailyWorkout[];
  modifications: IModifications;
  recoveryPlan: IRecoveryPlan;

  // Plan metadata
  planStatus: "active" | "completed" | "paused" | "archived";
  startDate: Date;
  endDate?: Date;
  currentWeek: number;
  totalWeeks: number;

  // Progress tracking
  completedWorkouts: number;
  totalWorkouts: number;
  adherenceRate: number; // percentage
  lastWorkoutDate?: Date;

  // AI/N8N metadata
  generatedBy: "n8n" | "manual" | "ai";
  generationData?: {
    timestamp: Date;
    version: string;
    parameters?: any;
  };

  createdAt: Date;
  updatedAt: Date;
}

const exerciseSchema = new Schema<IExercise>(
  {
    name: { type: String, required: true },
    sets: { type: Number },
    reps: { type: Schema.Types.Mixed }, // Can be number or string
    duration: { type: String },
    weight: { type: Number },
    restTime: { type: Number },
    notes: { type: String },
  },
  { _id: false }
);

const dailyWorkoutSchema = new Schema<IDailyWorkout>(
  {
    day: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [
        "Strength",
        "Endurance",
        "Full Body",
        "Rest",
        "HIIT",
        "Circuit Training",
      ],
    },
    focus: { type: String, required: true },
    exercises: [exerciseSchema],
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
    actualDuration: { type: Number },
    userRating: { type: Number, min: 1, max: 5 },
    notes: { type: String },
  },
  { _id: false }
);

const workoutUserInfoSchema = new Schema<IWorkoutUserInfo>(
  {
    workoutFrequency: { type: Number, required: true },
    preferredWorkoutTime: {
      type: String,
      required: true,
      enum: ["morning", "afternoon", "evening", "flexible"],
    },
    workoutDuration: { type: Number, required: true },
    fitnessGoals: [{ type: String }],
    injuries: [{ type: String }],
    medicalConditions: [{ type: String }],
  },
  { _id: false }
);

const modificationsSchema = new Schema<IModifications>(
  {
    forMedicalConditions: [{ type: String }],
    forInjuries: [{ type: String }],
  },
  { _id: false }
);

const recoveryPlanSchema = new Schema<IRecoveryPlan>(
  {
    restDays: [{ type: String }],
    recoveryTips: [{ type: String }],
  },
  { _id: false }
);

const userWorkoutSchema = new Schema<IUserWorkout>(
  {
    stackauthUserId: {
      type: String,
      required: true,
      index: true,
    },
    planId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    planName: { type: String },
    userInfo: { type: workoutUserInfoSchema, required: true },
    weeklySchedule: [dailyWorkoutSchema],
    modifications: { type: modificationsSchema, required: true },
    recoveryPlan: { type: recoveryPlanSchema, required: true },

    // Plan metadata
    planStatus: {
      type: String,
      enum: ["active", "completed", "paused", "archived"],
      default: "active",
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    currentWeek: { type: Number, default: 1 },
    totalWeeks: { type: Number, default: 4 },

    // Progress tracking
    completedWorkouts: { type: Number, default: 0 },
    totalWorkouts: { type: Number, default: 0 },
    adherenceRate: { type: Number, default: 0 },
    lastWorkoutDate: { type: Date },

    // AI/N8N metadata
    generatedBy: {
      type: String,
      enum: ["n8n", "manual", "ai"],
      default: "n8n",
    },
    generationData: {
      timestamp: { type: Date, default: Date.now },
      version: { type: String },
      parameters: { type: Schema.Types.Mixed },
    },
  },
  {
    timestamps: true,
    collection: "userworkouts",
  }
);

// Indexes for performance
userWorkoutSchema.index({ stackauthUserId: 1, planStatus: 1 });
userWorkoutSchema.index({ startDate: -1 });
userWorkoutSchema.index({ "weeklySchedule.day": 1 });
userWorkoutSchema.index({ planStatus: 1, startDate: -1 });

// Pre-save middleware to calculate total workouts
userWorkoutSchema.pre("save", function (next) {
  if (this.weeklySchedule && this.weeklySchedule.length > 0) {
    // Calculate total workouts (excluding rest days)
    const workoutDays = this.weeklySchedule.filter(
      (day) => day.type !== "Rest" && day.exercises.length > 0
    );
    this.totalWorkouts = workoutDays.length * this.totalWeeks;
  }
  next();
});

export const UserWorkout = model<IUserWorkout>(
  "UserWorkout",
  userWorkoutSchema
);
