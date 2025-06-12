import express from "express";
import { isRegistered } from "../services/User.service";
import multer from "multer";
import { UserProfileController } from "../controllers/UserProfileController";
import { AuthMiddleware } from "../middleware/Stackauthmidldeware";
import statustrackingService from "../services/statustracking.service";

const userAuth = new AuthMiddleware();
const userProfileController = new UserProfileController();

const router = express.Router();
const uplaod = multer();

router.get("/isRegistered/:id", isRegistered);

router.post(
  "/profile/setup",
  uplaod.none(),
  userAuth.authenticate,
  userProfileController.setupUserProfile.bind(userProfileController)
);
router.get("/process-status/:processId", (req, res) => {
  const status = statustrackingService.getStatus(req.params.processId);
  console.log(status);

  res.status(200).json(status);
});
export default router;
