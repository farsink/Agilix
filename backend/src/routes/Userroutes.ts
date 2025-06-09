import express from "express";
import { isRegistered } from "../services/User.service";

const router = express.Router();

router.get("/isRegistered/:id", isRegistered);

export default router;
