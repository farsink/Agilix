// src/controllers/UserWorkoutController.ts
import { Request, Response } from "express";
import { UserWorkoutService } from "../services/userworkout.service";
import { HttpStatusCode } from "../types/http";

export class UserWorkoutController {
  private userWorkoutService: UserWorkoutService;

  constructor() {
    this.userWorkoutService = new UserWorkoutService();
  }

  /**
   * Get active workout plan for authenticated user
   */
  public async getActivePlan(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      const activePlan = await this.userWorkoutService.getActivePlan(user.id);

      if (!activePlan) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          success: false,
          message: "No active workout plan found",
        });
        return;
      }

      res.status(HttpStatusCode.OK).json({
        success: true,
        data: activePlan,
        message: "Active workout plan retrieved successfully",
      });
    } catch (error) {
      console.error("Error getting active plan:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * Get all workout plans for authenticated user
   */
  public async getUserPlans(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      const limit = parseInt(req.query.limit as string) || 10;
      const plans = await this.userWorkoutService.getUserPlans(user.id, limit);

      res.status(HttpStatusCode.OK).json({
        success: true,
        data: plans,
        message: "Workout plans retrieved successfully",
      });
    } catch (error) {
      console.error("Error getting user plans:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * Mark a workout as completed
   */
  public async markWorkoutCompleted(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      const { planId, day, actualDuration, rating, notes } = req.body;

      if (!planId || !day) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Plan ID and day are required",
        });
        return;
      }

      const success = await this.userWorkoutService.markWorkoutCompleted(
        user.id,
        planId,
        day,
        actualDuration,
        rating,
        notes
      );

      if (success) {
        res.status(HttpStatusCode.OK).json({
          success: true,
          message: "Workout marked as completed successfully",
        });
      } else {
        res.status(HttpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Workout not found or already completed",
        });
      }
    } catch (error) {
      console.error("Error marking workout completed:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * Get workout statistics for authenticated user
   */
  public async getWorkoutStats(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      const stats = await this.userWorkoutService.getWorkoutStats(user.id);

      res.status(HttpStatusCode.OK).json({
        success: true,
        data: stats,
        message: "Workout statistics retrieved successfully",
      });
    } catch (error) {
      console.error("Error getting workout stats:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * Manual workout plan creation (for testing purposes)
   */
  public async createWorkoutPlan(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      const workoutData = req.body;

      const savedPlan = await this.userWorkoutService.saveWorkoutPlan(
        user.id,
        workoutData
      );

      if (savedPlan) {
        res.status(HttpStatusCode.CREATED).json({
          success: true,
          data: savedPlan,
          message: "Workout plan created successfully",
        });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Failed to create workout plan",
        });
      }
    } catch (error) {
      console.error("Error creating workout plan:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
