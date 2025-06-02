import { Request, Response } from "express";
import { Equipment, IEquipment } from "../models/Equipment";
import { Error } from "mongoose";
import { promise } from "zod";

export const createEquipment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const equipmentData = req.body;
    if (
      !equipmentData.name ||
      !equipmentData.category ||
      !equipmentData.description
    ) {
      res.status(400).json({
        error: "Name, category, and description are required fields.",
      });
    }
    const existingEquipment = await Equipment.findOne({
      name: { $regex: new RegExp(`^${equipmentData.name}$`, "i") },
    });
    if (existingEquipment) {
      throw new Error(
        `Equipment with name ${equipmentData.name} already exists.`
      );
    }

    const equipment = new Equipment(equipmentData);
    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    console.error("Error creating equipment:", error);
    throw new Error("Failed to create equipment");
  }
};

export const deleteEquipment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) {
      res.status(404).json({ message: "Equipment not found" });
    }
    res.status(200).json({ message: "Equipment deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const updateEquipment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEquipment) {
      res.status(404).json({ message: "Equipment not found" });
    }
    res.status(200).json(updatedEquipment);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const createMultiple = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const equipmentArray: IEquipment[] = req.body;

    // Validate that request body is an array
    if (!Array.isArray(equipmentArray)) {
      res.status(400).json({
        error: "Request body must be an array of equipment items",
      });
      return;
    }

    // Use insertMany for bulk insert
    const savedEquipment = await Equipment.insertMany(equipmentArray, {
      ordered: false, // Continue inserting even if some fail
      rawResult: true, // Get detailed results
    });

    res.status(201).json({
      message: `Successfully created LATEX_0_1748855685317{result.length} equipment items`,
      data: savedEquipment,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

export const dropallEquipment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await Equipment.deleteMany({});
    res.status(200).json({
      message: `${result.deletedCount} equipment items deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting all equipment:", error);
    res.status(500).json({ error: "Failed to delete all equipment" });
  }
};
