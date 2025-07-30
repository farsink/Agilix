import { UserProfile } from '../models/UserProfile';
import { UserWorkout } from '../models/UserWorkout';
import { updateUserAsRegistered } from './User.service';

export class UserProfileService {
  async saveOrUpdateUserProfile(formData: any) {
    try {
      const { userStackId, equipmentData, fitnessInfo, healthData, physicalInfo, selectedGoal, secondaryGoals, workoutPreferences } = formData;

      const parsedEquipmentData = JSON.parse(equipmentData);
      const parsedFitnessInfo = JSON.parse(fitnessInfo);
      const parsedHealthData = JSON.parse(healthData);
      const parsedPhysicalInfo = JSON.parse(physicalInfo);
      const parsedWorkoutPreferences = JSON.parse(workoutPreferences);

      // Use database transaction to ensure atomicity
      const result = await UserProfile.db.transaction(async (session) => {
        // Check if profile exists
        const existingProfile = await UserProfile.findOne({
          stackauthUserId: userStackId,
        }).session(session);

        let profile;

        if (existingProfile) {
          // Update existing user profile
          existingProfile.set({
            equipment: {
              preferredWorkoutSpace:
                parsedWorkoutPreferences.locations && parsedWorkoutPreferences.locations.length > 0
                  ? parsedWorkoutPreferences.locations.length > 1
                    ? 'mixed'
                    : parsedWorkoutPreferences.locations[0]
                  : 'home',
              spaceConstraints: {
                size: parsedEquipmentData.spaceSize,
                noiseRestrictions: parsedEquipmentData.constraints.noiseRestrictions,
                timeConstraints: parsedEquipmentData.constraints.limitedTimeSlots ? ['limited'] : [],
              },
              homeEquipment: parsedEquipmentData.selectedEquipment,
            },
            fitnessProfile: {
              experience: parsedFitnessInfo.fitnessLevel,
              activityLevel: parsedFitnessInfo.activityLevel,
              fitnessGoals: [selectedGoal, ...secondaryGoals.split(',')],
              injuries: parsedHealthData.injuries,
              medicalConditions: parsedHealthData.medicalConditions,
              workoutFrequency: parsedWorkoutPreferences.daysPerWeek,
              preferredWorkoutTime: parsedWorkoutPreferences.workoutTime,
              workoutDuration: parseInt(parsedWorkoutPreferences.sessionDuration.split('-')[1]),
            },
            bodyMetrics: {
              currentWeight: parsedPhysicalInfo.weight,
              height: parsedPhysicalInfo.height,
              lastUpdated: new Date(),
            },
          });
          profile = await existingProfile.save({ session });
        } else {
          // Create new user profile
          profile = new UserProfile({
            stackauthUserId: userStackId,
            equipment: {
              preferredWorkoutSpace:
                parsedWorkoutPreferences.locations && parsedWorkoutPreferences.locations.length > 0
                  ? parsedWorkoutPreferences.locations.length > 1
                    ? 'mixed'
                    : parsedWorkoutPreferences.locations[0]
                  : 'home',
              spaceConstraints: {
                size: parsedEquipmentData.spaceSize,
                noiseRestrictions: parsedEquipmentData.constraints.noiseRestrictions,
                timeConstraints: parsedEquipmentData.constraints.limitedTimeSlots ? ['limited'] : [],
              },
              homeEquipment: parsedEquipmentData.selectedEquipment,
            },
            fitnessProfile: {
              experience: parsedFitnessInfo.fitnessLevel,
              activityLevel: parsedFitnessInfo.activityLevel,
              fitnessGoals: [selectedGoal, ...secondaryGoals.split(',')],
              injuries: parsedHealthData.injuries,
              medicalConditions: parsedHealthData.medicalConditions,
              workoutFrequency: parsedWorkoutPreferences.daysPerWeek,
              preferredWorkoutTime: parsedWorkoutPreferences.workoutTime,
              workoutDuration: parseInt(parsedWorkoutPreferences.sessionDuration.split('-')[1]),
            },
            bodyMetrics: {
              currentWeight: parsedPhysicalInfo.weight,
              height: parsedPhysicalInfo.height,
              lastUpdated: new Date(),
            },
          });
          profile = await profile.save({ session });
        }

        // Update registration status in the same transaction
        await updateUserAsRegistered(userStackId);

        // Get workout plan
        const WorkoutPlan = await UserWorkout.findOne({ stackauthUserId: userStackId }).session(session);

        return { profile, WorkoutPlan };
      });

      return result;
    } catch (error) {
      console.error('Error in saveOrUpdateUserProfile:', error);
      throw new Error('Failed to complete onboarding process');
    }
  }

  async getUserProfile(stackauthUserId: string) {
    try {
      const profile = await UserProfile.findOne({ stackauthUserId: stackauthUserId });
      const WorkoutPlan = await UserWorkout.findOne({ stackauthUserId: stackauthUserId });

      if (!profile) {
        return null;
      }
      return { profile, WorkoutPlan };
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new Error('Could not get user profile');
    }
  }
}
