/* eslint-disable @typescript-eslint/no-explicit-any */

import { IWorkout } from "./workout";

export interface IUserInfo {
  profile: IUserProfile;
  WorkoutPlan: IWorkout;
}

export interface IUserProfile {
  bodyMetrics: BodyMetrics;
  fitnessProfile: FitnessProfile;
  equipment: Equipment;
  progressMetrics: ProgressMetrics;
  aiProcessingData: AiProcessingData;
  _id: string;
  userId: string;
  stackauthUserId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BodyMetrics {
  currentWeight: number;
  height: number;
  lastUpdated: string;
}

export interface FitnessProfile {
  experience: string;
  activityLevel: string;
  workoutFrequency: number;
  preferredWorkoutTime: string;
  workoutDuration: number;
  fitnessGoals: string[];
  injuries: any[];
  medicalConditions: any[];
}

export interface Equipment {
  spaceConstraints: SpaceConstraints;
  homeEquipment: string[];
  preferredWorkoutSpace: string;
  hasGym: boolean;
}

export interface SpaceConstraints {
  size: string;
  noiseRestrictions: boolean;
  timeConstraints: string[];
}

export interface ProgressMetrics {
  startDate: string;
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  totalWorkoutTime: number;
  averageWorkoutRating: number;
}

export interface AiProcessingData {
  planAdjustments: number;
  n8nWebhookHistory: N8nWebhookHistory[];
  workoutPlanGenerated: string;
}

export interface N8nWebhookHistory {
  timestamp: string;
  type: string;
  status: string;
  data: Data;
  _id: string;
}

export interface Data {
  event?: string;
  timestamp?: string;
  userProfile?: UserProfile;
  error?: string;
  planId?: string;
}

export interface UserProfile {
  userId: string;
  bodyMetrics: BodyMetrics2;
  fitnessProfile: FitnessProfile2;
  equipment: Equipment2;
}

export interface BodyMetrics2 {
  currentWeight: number;
  height: number;
  lastUpdated: string;
}

export interface FitnessProfile2 {
  experience: string;
  activityLevel: string;
  workoutFrequency: number;
  preferredWorkoutTime: string;
  workoutDuration: number;
  fitnessGoals: string[];
  injuries: any[];
  medicalConditions: string[];
}

export interface Equipment2 {
  homeEquipment: string[];
  preferredWorkoutSpace: string;
  spaceConstraints: SpaceConstraints2;
  hasGym: boolean;
}

export interface SpaceConstraints2 {
  size: string;
  noiseRestrictions: boolean;
  timeConstraints: string[];
}
