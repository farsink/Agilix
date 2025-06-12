import { Router } from "express";
import UserProfileController from "../controllers/UserProfileController";
import multer from "multer";

const router = Router();
const userProfileController = new UserProfileController();
const upload = multer();

router.post(
  "/profile/setup",
  upload.none(),
  userProfileController.setupUserProfile
);

export default router;
