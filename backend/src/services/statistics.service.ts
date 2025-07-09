import UserStatisticsModel, {
  UserStatisticsDocument,
} from "../models/Userstaticts";
import {
  UpdateStatsData,
  TodayStatsResponse,
  ThisWeekStatsResponse,
  GraphDataPoint,
  DashboardData,
  DailyStats,
} from "../types/statics";

class StatisticsService {
  /**
   * Initialize user statistics document
   */
  async initializeUserStats(
    userId: string,
    stackauthUserId: string
  ): Promise<UserStatisticsDocument> {
    try {
      const existingStats = await UserStatisticsModel.findOne({ userId });

      if (!existingStats) {
        const newStats = new UserStatisticsModel({
          userId,
          stackauthUserId,
          dailyStats: [],
          weeklyAggregates: [],
        });

        await newStats.save();
        console.log(`Statistics initialized for user: ${userId}`);
        return newStats;
      }

      return existingStats;
    } catch (error) {
      console.error("Error initializing user stats:", error);
      throw new Error(
        `Failed to initialize user statistics: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Update daily statistics - MAIN SYNC FUNCTION
   */
  async updateDailyStats(
    userId: string,
    statsData: UpdateStatsData
  ): Promise<UserStatisticsDocument> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const userStats = await UserStatisticsModel.findOne({ userId });

      if (!userStats) {
        throw new Error("User statistics not found. Initialize first.");
      }

      // Find today's entry or create new one
      const todayIndex = userStats.dailyStats.findIndex((stat: DailyStats) => {
        const statDate = new Date(stat.date);
        statDate.setHours(0, 0, 0, 0);
        return statDate.getTime() === today.getTime();
      });

      const todayStats: DailyStats = {
        date: today,
        workoutTime: statsData.workoutTime || 0,
        caloriesBurned: statsData.caloriesBurned || 0,
        workoutsCompleted: statsData.workoutsCompleted || 0,
        steps: statsData.steps || 0,
        heartRateAvg: statsData.heartRateAvg || 0,
        intensityAvg: statsData.intensityAvg || 0,
      };

      if (todayIndex >= 0) {
        // Update existing entry (ADD to existing values)
        userStats.dailyStats[todayIndex].workoutTime += todayStats.workoutTime;
        userStats.dailyStats[todayIndex].caloriesBurned +=
          todayStats.caloriesBurned;
        userStats.dailyStats[todayIndex].workoutsCompleted +=
          todayStats.workoutsCompleted;
        userStats.dailyStats[todayIndex].steps += todayStats.steps;

        // Average heart rate and intensity
        if (todayStats.heartRateAvg > 0) {
          userStats.dailyStats[todayIndex].heartRateAvg = Math.round(
            (userStats.dailyStats[todayIndex].heartRateAvg +
              todayStats.heartRateAvg) /
              2
          );
        }
        if (todayStats.intensityAvg > 0) {
          userStats.dailyStats[todayIndex].intensityAvg =
            Math.round(
              ((userStats.dailyStats[todayIndex].intensityAvg +
                todayStats.intensityAvg) /
                2) *
                10
            ) / 10;
        }
      } else {
        // Add new daily entry
        userStats.dailyStats.push(todayStats);

        // Keep only last 30 days to prevent bloating
        if (userStats.dailyStats.length > 30) {
          userStats.dailyStats = userStats.dailyStats
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 30);
        }
      }

      await userStats.save();

      // Update weekly aggregates
      await this.updateWeeklyAggregates(userId);

      console.log(`Daily stats updated for user: ${userId}`);
      return userStats;
    } catch (error) {
      console.error("Error updating daily stats:", error);
      throw new Error(
        `Failed to update daily statistics: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Update weekly aggregates
   */
  async updateWeeklyAggregates(userId: string): Promise<void> {
    try {
      const userStats = await UserStatisticsModel.findOne({ userId });

      if (!userStats) {
        throw new Error("User statistics not found");
      }

      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      // Calculate this week's totals
      const thisWeekStats = userStats.dailyStats.filter((stat: DailyStats) => {
        const statDate = new Date(stat.date);
        return statDate >= weekStart && statDate < weekEnd;
      });

      const weeklyAggregate = {
        weekStart,
        weekEnd,
        totalHours:
          Math.round(
            thisWeekStats.reduce(
              (sum, stat) => sum + stat.workoutTime / 60,
              0
            ) * 100
          ) / 100,
        totalCalories: thisWeekStats.reduce(
          (sum, stat) => sum + stat.caloriesBurned,
          0
        ),
        totalWorkouts: thisWeekStats.reduce(
          (sum, stat) => sum + stat.workoutsCompleted,
          0
        ),
        workoutDays: thisWeekStats.filter((stat) => stat.workoutsCompleted > 0)
          .length,
        averageDailyCalories: 0,
      };

      weeklyAggregate.averageDailyCalories = Math.round(
        weeklyAggregate.totalCalories / 7
      );

      // Update or add weekly aggregate
      const existingWeekIndex = userStats.weeklyAggregates.findIndex((week) => {
        const weekStartTime = new Date(week.weekStart).getTime();
        return weekStartTime === weekStart.getTime();
      });

      if (existingWeekIndex >= 0) {
        userStats.weeklyAggregates[existingWeekIndex] = weeklyAggregate;
      } else {
        userStats.weeklyAggregates.push(weeklyAggregate);

        // Keep only last 12 weeks
        if (userStats.weeklyAggregates.length > 12) {
          userStats.weeklyAggregates = userStats.weeklyAggregates
            .sort(
              (a, b) =>
                new Date(b.weekStart).getTime() -
                new Date(a.weekStart).getTime()
            )
            .slice(0, 12);
        }
      }

      await userStats.save();
    } catch (error) {
      console.error("Error updating weekly aggregates:", error);
      throw new Error(
        `Failed to update weekly aggregates: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Get today's statistics
   */
  async getTodayStats(userId: string): Promise<TodayStatsResponse> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const userStats = await UserStatisticsModel.findOne({ userId });

      if (!userStats) {
        return { caloriesBurned: 0, workoutTime: 0, workoutsCompleted: 0 };
      }

      const todayStats = userStats.dailyStats.find((stat: DailyStats) => {
        const statDate = new Date(stat.date);
        statDate.setHours(0, 0, 0, 0);
        return statDate.getTime() === today.getTime();
      });

      return {
        caloriesBurned: todayStats?.caloriesBurned || 0,
        workoutTime: todayStats?.workoutTime || 0,
        workoutsCompleted: todayStats?.workoutsCompleted || 0,
      };
    } catch (error) {
      console.error("Error getting today stats:", error);
      throw new Error(
        `Failed to get today's statistics: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Get this week's statistics
   */
  async getThisWeekStats(userId: string): Promise<ThisWeekStatsResponse> {
    try {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);

      const userStats = await UserStatisticsModel.findOne({ userId });

      if (!userStats) {
        return {
          totalHours: 0,
          totalCalories: 0,
          workoutDays: 0,
          averageDaily: 0,
        };
      }

      const thisWeekAggregate = userStats.weeklyAggregates.find((week) => {
        const weekStartTime = new Date(week.weekStart).getTime();
        return weekStartTime === weekStart.getTime();
      });

      return {
        totalHours: thisWeekAggregate?.totalHours || 0,
        totalCalories: thisWeekAggregate?.totalCalories || 0,
        workoutDays: thisWeekAggregate?.workoutDays || 0,
        averageDaily: thisWeekAggregate?.averageDailyCalories || 0,
      };
    } catch (error) {
      console.error("Error getting this week stats:", error);
      throw new Error(
        `Failed to get this week's statistics: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Get 7-day graph data
   */
  async getGraphData(userId: string): Promise<GraphDataPoint[]> {
    try {
      const userStats = await UserStatisticsModel.findOne({ userId });

      if (!userStats) return [];

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        date.setHours(0, 0, 0, 0);
        return date;
      });

      return last7Days.map((date: Date): GraphDataPoint => {
        const dayStats = userStats.dailyStats.find((stat: DailyStats) => {
          const statDate = new Date(stat.date);
          statDate.setHours(0, 0, 0, 0);
          return statDate.getTime() === date.getTime();
        });

        return {
          day: date.toLocaleDateString("en", { weekday: "short" }),
          date: date.toISOString().split("T")[0],
          calories: dayStats?.caloriesBurned || 0,
          workoutTime: dayStats?.workoutTime || 0,
        };
      });
    } catch (error) {
      console.error("Error getting graph data:", error);
      throw new Error(
        `Failed to get graph data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Get complete dashboard data
   */
  async getDashboardData(userId: string): Promise<DashboardData> {
    try {
      const [todayStats, weekStats, graphData] = await Promise.all([
        this.getTodayStats(userId),
        this.getThisWeekStats(userId),
        this.getGraphData(userId),
      ]);

      return {
        today: todayStats,
        thisWeek: weekStats,
        graphData,
      };
    } catch (error) {
      console.error("Error getting dashboard data:", error);
      throw new Error(
        `Failed to get dashboard data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export default new StatisticsService();
