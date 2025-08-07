/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "@/hooks/use-toast";
import { useStackAuthApi } from "./Stackclientapi";
import { 
  withRetry, 
  withTimeout, 
  classifyError, 
  ErrorType, 
  ClassifiedError,
  DEFAULT_RETRY_CONFIG 
} from "@/utils/errorHandling";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ClassifiedError;
}

export interface IsRegisteredResponse {
  success: boolean;
  isRegistered: boolean;
  message?: string;
}

export const useUserApi = () => {
  const { api } = useStackAuthApi();

  const IsRegistered = async (): Promise<IsRegisteredResponse> => {
    try {
      // Wrap the API call with retry logic and timeout
      const response = await withRetry(
        () => withTimeout(
          api.get<IsRegisteredResponse>(`/user/isRegistered`),
          12000, // 12 second timeout for this specific call
          'Registration check timed out'
        ),
        {
          ...DEFAULT_RETRY_CONFIG,
          maxAttempts: 2, // Fewer retries for registration check
        },
        (attempt, error) => {
          console.log(`Retrying IsRegistered call (attempt ${attempt}):`, error.message);
        }
      );

      // On success, return the data directly. TanStack Query will handle the rest.
      return response.data;

    } catch (error: any) {
      const classifiedError = error.type ? error : classifyError(error);
      
      console.error("Error in IsRegistered:", classifiedError);
      
      // Don't show toast for auth errors - let the component handle redirect
      if (classifiedError.type !== ErrorType.AUTH) {
        toast({
          title: "Registration Check Failed",
          description: classifiedError.userMessage,
          variant: "destructive",
        });
      }

      // On failure, throw the classified error. TanStack Query will catch it.
      throw classifiedError;
    }
  };

 

  const getUserProfile = async (): Promise<ApiResponse> => {
    try {
      const response = await withRetry(
        () => withTimeout(
          api.get("/user/profile"),
          10000, // 10 second timeout for profile
          'Profile fetch timed out'
        ),
        DEFAULT_RETRY_CONFIG,
        (attempt, error) => {
          console.log(`Retrying getUserProfile call (attempt ${attempt}):`, error.message);
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      const classifiedError = error.type ? error : classifyError(error);
      
      console.error("Error in getUserProfile:", classifiedError);
      
      // Don't show toast for auth errors - let the component handle redirect
      if (classifiedError.type !== ErrorType.AUTH) {
        toast({
          title: "Profile Fetch Failed",
          description: classifiedError.userMessage,
          variant: "destructive",
        });
      }

      return {
        success: false,
        error: classifiedError
      };
    }
  };

  return { IsRegistered, getUserProfile };
};
