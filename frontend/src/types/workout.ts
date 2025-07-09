/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IWorkout {
  generationData: GenerationData;
  _id: string;
  stackauthUserId: string;
  planId: string;
  planName: string;
  userInfo: UserInfo2;
  weeklySchedule: WeeklySchedule2[];
  modifications: Modifications2;
  recoveryPlan: RecoveryPlan2;
  planStatus: string;
  currentWeek: number;
  totalWeeks: number;
  completedWorkouts: number;
  totalWorkouts: number;
  adherenceRate: number;
  generatedBy: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GenerationData {
  timestamp: string;
  version: string;
  parameters: Parameters;
}

export interface Parameters {
  source: string;
  originalData: OriginalData;
}

export interface OriginalData {
  userInfo: UserInfo;
  weeklySchedule: WeeklySchedule[];
  modifications: Modifications;
  recoveryPlan: RecoveryPlan;
}

export interface UserInfo {
  workoutFrequency: number;
  preferredWorkoutTime: string;
  workoutDuration: number;
  fitnessGoals: string[];
  injuries: any[];
  medicalConditions: any[];
}

export interface WeeklySchedule {
  day: string;
  type: string;
  focus: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets?: number;
  reps: any;
  duration?: string;
}

export interface Modifications {
  forMedicalConditions: any[];
  forInjuries: any[];
}

export interface RecoveryPlan {
  restDays: string[];
  recoveryTips: string[];
}

export interface UserInfo2 {
  workoutFrequency: number;
  preferredWorkoutTime: string;
  workoutDuration: number;
  fitnessGoals: string[];
  injuries: any[];
  medicalConditions: any[];
}

export interface WeeklySchedule2 {
  day: string;
  type: string;
  focus: string;
  exercises: Exercise2[];
  completed: boolean;
}

export interface Exercise2 {
  name: string;
  sets?: number;
  reps: any;
  duration?: string;
}

export interface Modifications2 {
  forMedicalConditions: any[];
  forInjuries: any[];
}

export interface RecoveryPlan2 {
  restDays: string[];
  recoveryTips: string[];
}
