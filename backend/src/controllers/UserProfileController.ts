import { Request, Response } from "express";
import { UserProfile } from "../models/UserProfile";
import { UserProfileService } from "../services/UserProfile.service";

export class UserProfileController {
  private userProfileService: UserProfileService;

  constructor() {
    this.userProfileService = new UserProfileService();
  }

  public async setupUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const profileData = req.body;

      if (!profileData.userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      const result = await this.userProfileService.saveOrUpdateUserProfile(
        profileData
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("Error setting up user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserProfileController;
