import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";
import {
  UserStatistics as IUserStatistics,
  DailyStats,
  WeeklyAggregate,
} from "../types/statics";

// Extend the interface to include Mongoose Document methods
export interface UserStatisticsDocument extends IUserStatistics, Document {
  _id: string;
}

const DailyStatsSchema = new Schema<DailyStats>(
  {
    date: {
      type: Date,
      required: true,
    },
    workoutTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
      min: 0,
    },
    workoutsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },
    steps: {
      type: Number,
      default: 0,
      min: 0,
    },
    heartRateAvg: {
      type: Number,
      default: 0,
      min: 0,
      max: 220,
    },
    intensityAvg: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
  },
  { _id: false }
);

const WeeklyAggregateSchema = new Schema<WeeklyAggregate>(
  {
    weekStart: {
      type: Date,
      required: true,
    },
    weekEnd: {
      type: Date,
      required: true,
    },
    totalHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalCalories: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalWorkouts: {
      type: Number,
      default: 0,
      min: 0,
    },
    workoutDays: {
      type: Number,
      default: 0,
      min: 0,
      max: 7,
    },
    averageDailyCalories: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

const UserStatisticsSchema = new Schema<UserStatisticsDocument>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  stackauthUserId: {
    type: String,
    required: true,
    index: true,
  },
  dailyStats: [DailyStatsSchema],
  weeklyAggregates: [WeeklyAggregateSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound indexes for efficient queries
UserStatisticsSchema.index({ userId: 1, "dailyStats.date": 1 });
UserStatisticsSchema.index({ stackauthUserId: 1, "dailyStats.date": 1 });

// Middleware to update updatedAt
UserStatisticsSchema.pre<UserStatisticsDocument>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const UserStatisticsModel: Model<UserStatisticsDocument> =
  mongoose.model<UserStatisticsDocument>(
    "UserStatistics",
    UserStatisticsSchema
  );

export default UserStatisticsModel;
