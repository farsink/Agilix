import { Request, Response } from "express";
import { UserProfile } from "../models/UserProfile";
import { UserProfileService } from "../services/UserProfile.service";
import { N8NWebhookService } from "../services/N8NWebhook.service";
import statustrackingService from "../services/statustracking.service";
import { HttpStatusCode } from "axios";

export class UserProfileController {
  private userProfileService: UserProfileService;
  private n8nWebhookService: N8NWebhookService;

  constructor() {
    this.userProfileService = new UserProfileService();
    this.n8nWebhookService = new N8NWebhookService();
  }

  public async setupUserProfile(req: Request, res: Response): Promise<void> {
    const processId = statustrackingService.startProcess(req.body.userStackId);
    try {
      const profileData = req.body;

      const existingProfile = await UserProfile.findOne({
        stackauthUserId: profileData.userStackId,
      });

      const isUpdate = !!existingProfile;

      if (!profileData.userStackId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }
      const eventType = isUpdate ? "profile_updated" : "profile_created";

      const result = await this.userProfileService.saveOrUpdateUserProfile(
        profileData
      );
      res.status(200).json({ processId, result });

      statustrackingService.updateStatus(processId, "PROFILE_SAVED", 30);

      if (result !== null) {
        await this.n8nWebhookService.sendProfileData(
          result,
          eventType,
          processId
        );
      }
    } catch (error) {
      console.error("Error setting up user profile:", error);
      statustrackingService.updateStatus(processId, "FAILED", 100);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;


      if (!user) {
        res.status(HttpStatusCode.Unauthorized).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      const profile = await this.userProfileService.getUserProfile(user.id);

      if (!profile) {
        res.status(HttpStatusCode.NotFound).json({
          success: false,
          message: "User profile not found",
        });
        return;
      }

      res.status(HttpStatusCode.Ok).json({
        success: true,
        data: profile,
        message: "User profile retrieved successfully",
      });
    } catch (error) {
      console.error("Error getting user profile:", error);
      res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export default UserProfileController;
