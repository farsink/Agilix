import express, { Request, Response } from "express";
import { Equipment } from "../models/Equipment";
import {
  createEquipment,
  createMultiple,
  deleteEquipment,
  dropallEquipment,
  updateEquipment,
} from "../services/Equipment.service";

const router = express.Router();

router.post("/add", createEquipment);

router.delete("/delete/:id", deleteEquipment);

router.put("/update/:id", updateEquipment);

router.post("/bulk", createMultiple);

router.delete("/dropAll", dropallEquipment);

export default router;
