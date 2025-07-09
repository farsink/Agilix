// src/utils/UserMetrics.ts

import { Exercise2 } from "../types/workout";
import { IUserInfo } from "../types/user";
// src/lib/Userstatics.ts

export class UserMetrics {
  static getDayStreak(userProfile: IUserInfo): number {
    return userProfile?.profile?.progressMetrics?.currentStreak ?? 0;
  }

  static calculateXP(userProfile: IUserInfo): number {
    const pm = userProfile?.profile?.progressMetrics;
    if (!pm) return 0;
    return (
      (pm.totalWorkouts ?? 0) * 10 +
      ((pm.totalWorkoutTime ?? 0) / 60) * 5 +
      (pm.currentStreak ?? 0) * 15 +
      (pm.longestStreak ?? 0) * 25
    );
  }

  static calculateLevel(totalXP: number): number {
    return Math.floor(Math.sqrt((totalXP ?? 0) / 100)) + 1;
  }

  static TodayExercise(userProfile: IUserInfo): Exercise2[] {
    const today = new Date();
    const day = today.toLocaleString("en-us", { weekday: "long" });
    const workout = userProfile?.WorkoutPlan?.weeklySchedule?.find(
      (w) => w.day === day
    );
    console.log(workout?.exercises);
    return workout?.exercises ?? [];
  }
}
