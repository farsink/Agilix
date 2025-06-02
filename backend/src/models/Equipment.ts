// src/models/mongodb/Equipment.ts
import { Schema, model, Document } from "mongoose";

export interface IEquipment extends Document {
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  imageUrl?: string;
   muscleGroups: string[];
  exerciseTypes: string[];
  spaceRequired: "small" | "medium" | "large";
  difficultyLevel: "beginner" | "intermediate" | "advanced" | "all";
  alternatives?: string[]; // Alternative equipment names
  isPopular: boolean;
  tags: string[];
}

const equipmentSchema = new Schema<IEquipment>(
  {
    name: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: ["cardio", "strength", "flexibility", "functional", "bodyweight"],
    },
    subcategory: String,
    description: { type: String, required: true },
    imageUrl: String, // Cloudinary URL
    muscleGroups: [
      {
        type: String,
        enum: [
          "chest",
          "back",
          "shoulders",
          "arms",
          "core",
          "legs",
          "glutes",
          "full_body",
        ],
      },
    ],
    exerciseTypes: [{ type: String }],
    spaceRequired: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "medium",
    },
    difficultyLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "all"],
      default: "all",
    },
    alternatives: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
    collection: "equipment",
  }
);

// Indexes
equipmentSchema.index({ category: 1, subcategory: 1 });
equipmentSchema.index({ muscleGroups: 1 });
equipmentSchema.index({ tags: 1 });
equipmentSchema.index({ name: "text", description: "text" });

export const Equipment = model<IEquipment>("Equipment", equipmentSchema);
