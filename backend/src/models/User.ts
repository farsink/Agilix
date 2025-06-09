import { Prisma } from "@prisma/client";
import prisma from "../config/database_Sql";
import { HttpStatusCode } from "../types/http";

interface UserCreateInput {
  stackauthUserId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  profileData?: Record<string, unknown> | undefined;
  fitnessGoals?: string[];
  isVerified?: boolean;
  isRegistered?: boolean; // Add this field
}
class UserModel {
  async create(userData: UserCreateInput) {
    return prisma.user.create({
      data: {
        ...userData,
        profileData: userData.profileData as Prisma.InputJsonValue,
        isVerified: userData.isVerified ?? false, // Cast here
        isRegistered: userData.isRegistered ?? false,
      },
    });
  }

  async findByStackAuthId(stackauthUserId: string) {
    return prisma.user.findUnique({
      where: { stackauthUserId },
    });
  }

  async updateProfile(userId: string, updateData: Partial<UserCreateInput>) {
    if (!updateData.email) {
      throw new Error("Email is required to update profile");
    }
    const userData: UserCreateInput = {
      stackauthUserId: updateData.stackauthUserId || "",
      email: updateData.email, // Ensure email is present
      firstName: updateData.firstName ?? null,
      lastName: updateData.lastName ?? null,
      profileData: updateData.profileData
        ? JSON.parse(JSON.stringify(updateData.profileData))
        : undefined,
      fitnessGoals: updateData.fitnessGoals,
      isVerified: updateData.isVerified,
    };
    return prisma.user.update({
      where: { id: userId },
      data: {
        stackauthUserId: updateData.stackauthUserId || "",
        email: updateData.email,
        firstName: updateData.firstName ?? null,
        lastName: updateData.lastName ?? null,
        profileData: updateData.profileData
          ? (updateData.profileData as Prisma.InputJsonValue)
          : undefined,
        fitnessGoals: updateData.fitnessGoals,
        isVerified: updateData.isVerified,
      },
    });
  }
}

export default new UserModel();
