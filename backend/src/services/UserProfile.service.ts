import { UserProfile } from "../models/UserProfile";

export class UserProfileService {
  async saveOrUpdateUserProfile(formData: any) {
    try {
      const {
        userStackId,
        equipmentData,
        fitnessInfo,
        healthData,
        physicalInfo,
        selectedGoal,
        secondaryGoals,
        workoutPreferences,
      } = formData;

      const parsedEquipmentData = JSON.parse(equipmentData);
      const parsedFitnessInfo = JSON.parse(fitnessInfo);
      const parsedHealthData = JSON.parse(healthData);
      const parsedPhysicalInfo = JSON.parse(physicalInfo);
      const parsedWorkoutPreferences = JSON.parse(workoutPreferences);

      const existingProfile = await UserProfile.findOne({
        stackauthUserId: userStackId,
      });

      if (existingProfile) {
        // Update existing user profile
        existingProfile.set({
          equipment: {
            preferredWorkoutSpace: parsedEquipmentData.spaceSize,
            spaceConstraints: {
              size: parsedEquipmentData.spaceSize,
              noiseRestrictions:
                parsedEquipmentData.constraints.noiseRestrictions,
              timeConstraints: parsedEquipmentData.constraints.limitedTimeSlots
                ? ["limited"]
                : [],
            },
            homeEquipment: parsedEquipmentData.selectedEquipment,
          },
          fitnessProfile: {
            experience: parsedFitnessInfo.fitnessLevel,
            activityLevel: parsedFitnessInfo.activityLevel,
            fitnessGoals: [selectedGoal, ...secondaryGoals.split(",")],
            injuries: parsedHealthData.injuries,
            medicalConditions: parsedHealthData.medicalConditions,
            workoutFrequency: parsedWorkoutPreferences.daysPerWeek,
            preferredWorkoutTime: parsedWorkoutPreferences.workoutTime,
            workoutDuration: parseInt(
              parsedWorkoutPreferences.sessionDuration.split("-")[1]
            ),
          },
          bodyMetrics: {
            currentWeight: parsedPhysicalInfo.weight,
            height: parsedPhysicalInfo.height,
            lastUpdated: new Date(),
          },
        });
        await existingProfile.save();
        return existingProfile;
      } else {
        // Create new user profile
        const newProfile = new UserProfile({
          stackauthUserId: userStackId,
          equipment: {
            preferredWorkoutSpace: parsedEquipmentData.spaceSize,
            spaceConstraints: {
              size: parsedEquipmentData.spaceSize,
              noiseRestrictions:
                parsedEquipmentData.constraints.noiseRestrictions,
              timeConstraints: parsedEquipmentData.constraints.limitedTimeSlots
                ? ["limited"]
                : [],
            },
            homeEquipment: parsedEquipmentData.selectedEquipment,
          },
          fitnessProfile: {
            experience: parsedFitnessInfo.fitnessLevel,
            activityLevel: parsedFitnessInfo.activityLevel,
            fitnessGoals: [selectedGoal, ...secondaryGoals.split(",")],
            injuries: parsedHealthData.injuries,
            medicalConditions: parsedHealthData.medicalConditions,
            workoutFrequency: parsedWorkoutPreferences.daysPerWeek,
            preferredWorkoutTime: parsedWorkoutPreferences.workoutTime,
            workoutDuration: parseInt(
              parsedWorkoutPreferences.sessionDuration.split("-")[1]
            ),
          },
          bodyMetrics: {
            currentWeight: parsedPhysicalInfo.weight,
            height: parsedPhysicalInfo.height,
            lastUpdated: new Date(),
          },
        });
        await newProfile.save();
        return newProfile;
      }
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw new Error("Could not save user profile");
    }
  }

  async getUserProfile(userId: string) {
    try {
      const profile = await UserProfile.findOne({ userId });
      return profile;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw new Error("Could not get user profile");
    }
  }
}
