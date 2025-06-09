import { Router } from "express";
import UserProfileController from "../controllers/UserProfileController";

const router = Router();
const userProfileController = new UserProfileController();

router.post(
  "/user/profile/setup",
 userProfileController.setupUserProfile
);

export default router;
