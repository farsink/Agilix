import express, { Request, Response } from "express";
import StatisticsService from "../services/statistics.service";
import {
  SyncWorkoutRequest,
  ApiResponse,
  DashboardData,
} from "../types/statics";
// Extended Request interface to include user data
import { User } from "@stackframe/stack";
import { AuthMiddleware } from "../middleware/Stackauthmidldeware";

const router = express.Router();
interface AuthenticatedRequest extends Request {
  user: User;
}
const userAuth = new AuthMiddleware();

// Type guard to check if request is authenticated
const isAuthenticatedRequest = (req: Request): req is AuthenticatedRequest => {
  return "user" in req && req.user !== undefined;
};

/**
 * POST /api/statistics/sync
 * Main endpoint to sync workout data
 */
router.post("/sync", async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isAuthenticatedRequest(req)) {
      res.status(401).json({
        success: false,
        error: "Authentication required",
      } as ApiResponse);
      return;
    }

    const userId = req.user.id;
    const {
      workoutTime,
      caloriesBurned,
      workoutsCompleted = 1,
      steps = 0,
      heartRateAvg = 0,
      intensityAvg = 0,
    }: SyncWorkoutRequest = req.body;

    // Validate required fields
    if (!workoutTime && !caloriesBurned) {
      res.status(400).json({
        success: false,
        error: "At least workoutTime or caloriesBurned is required",
      } as ApiResponse);
      return;
    }

    // Validate data types and ranges
    const validatedData: Required<SyncWorkoutRequest> = {
      workoutTime: Math.max(0, parseInt(String(workoutTime)) || 0),
      caloriesBurned: Math.max(0, parseInt(String(caloriesBurned)) || 0),
      workoutsCompleted: Math.max(0, parseInt(String(workoutsCompleted)) || 1),
      steps: Math.max(0, parseInt(String(steps)) || 0),
      heartRateAvg: Math.max(
        0,
        Math.min(220, parseInt(String(heartRateAvg)) || 0)
      ),
      intensityAvg: Math.max(
        0,
        Math.min(10, parseInt(String(intensityAvg)) || 0)
      ),
    };

    // Update statistics
    await StatisticsService.updateDailyStats(userId, validatedData);

    res.json({
      success: true,
      message: "Statistics updated successfully",
    } as ApiResponse);
  } catch (error) {
    console.error("Statistics sync error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to sync statistics",
    } as ApiResponse);
  }
});

/**
 * GET /api/statistics/dashboard
 * Get all dashboard data in one call
 */
router.get(
  "/dashboard",
  userAuth.authenticate,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!isAuthenticatedRequest(req)) {
        res.status(401).json({
          success: false,
          error: "Authentication required",
        } as ApiResponse);
        return;
      }

      const userId = req.user.id;
      const dashboardData = await StatisticsService.getDashboardData(userId);

      res.json({
        success: true,
        data: dashboardData,
      } as ApiResponse<DashboardData>);
    } catch (error) {
      console.error("Dashboard data error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch dashboard data",
      } as ApiResponse);
    }
  }
);

/**
 * GET /api/statistics/today
 * Get today's statistics only
 */
router.get("/today", async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isAuthenticatedRequest(req)) {
      res.status(401).json({
        success: false,
        error: "Authentication required",
      } as ApiResponse);
      return;
    }

    const userId = req.user.id;
    const todayStats = await StatisticsService.getTodayStats(userId);

    res.json({
      success: true,
      data: todayStats,
    } as ApiResponse);
  } catch (error) {
    console.error("Today stats error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch today's statistics",
    } as ApiResponse);
  }
});

/**
 * POST /api/statistics/initialize
 * Initialize statistics for new user
 */
router.post(
  "/initialize",
  userAuth.authenticate,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!isAuthenticatedRequest(req)) {
        res.status(401).json({
          success: false,
          error: "Authentication required",
        } as ApiResponse);
        return;
      }

      const userId = req.user.id;
      const stackauthUserId = req.user.id;

      await StatisticsService.initializeUserStats(userId, stackauthUserId);

      res.json({
        success: true,
        message: "Statistics initialized successfully",
      } as ApiResponse);
    } catch (error) {
      console.error("Statistics initialization error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to initialize statistics",
      } as ApiResponse);
    }
  }
);

export default router;
