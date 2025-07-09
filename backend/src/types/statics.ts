export interface DailyStats {
  date: Date;
  workoutTime: number; // in minutes
  caloriesBurned: number;
  workoutsCompleted: number;
  steps: number;
  heartRateAvg: number;
  intensityAvg: number; // 1-10 scale
}

export interface WeeklyAggregate {
  weekStart: Date;
  weekEnd: Date;
  totalHours: number;
  totalCalories: number;
  totalWorkouts: number;
  workoutDays: number;
  averageDailyCalories: number;
}

export interface UserStatistics {
  _id?: string;
  userId: string;
  stackauthUserId: string;
  dailyStats: DailyStats[];
  weeklyAggregates: WeeklyAggregate[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateStatsData {
  workoutTime?: number;
  caloriesBurned?: number;
  workoutsCompleted?: number;
  steps?: number;
  heartRateAvg?: number;
  intensityAvg?: number;
}

export interface TodayStatsResponse {
  caloriesBurned: number;
  workoutTime: number;
  workoutsCompleted: number;
}

export interface ThisWeekStatsResponse {
  totalHours: number;
  totalCalories: number;
  workoutDays: number;
  averageDaily: number;
}

export interface GraphDataPoint {
  day: string;
  date: string;
  calories: number;
  workoutTime: number;
}

export interface DashboardData {
  today: TodayStatsResponse;
  thisWeek: ThisWeekStatsResponse;
  graphData: GraphDataPoint[];
}

export interface SyncWorkoutRequest {
  workoutTime?: number;
  caloriesBurned?: number;
  workoutsCompleted?: number;
  steps?: number;
  heartRateAvg?: number;
  intensityAvg?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
