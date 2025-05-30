import prisma from "../config/database_Sql";
import { HttpStatusCode } from "../types/http";

interface UserCreateInput {
  stackauth_user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_data?: Record<string, unknown>;
  fitness_goals?: string[];
}

class UserModel {
  async create(userData: UserCreateInput): Promise<UserCreateInput> {
    return prisma.user.create({ data: userData });
  }

  async findByStackAuthId(
    stackauth_user_id: string
  ): Promise<UserCreateInput | null> {
    return prisma.user.findUnique({
      where: { stackauth_user_id },
    });
  }

  async updateProfile(
    userId: string,
    updateData: Partial<UserCreateInput>
  ): Promise<UserCreateInput> {
    return prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }
}

export default new UserModel();
