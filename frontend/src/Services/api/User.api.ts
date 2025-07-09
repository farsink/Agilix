import { toast } from "@/hooks/use-toast";
import api from "./Axios";
import { useStackAuthApi } from "./Stackclientapi";

export const IsRegistered = async (userId: string) => {
  try {
    const response = await api.get(`/user/isRegistered/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching user", error);
    toast({
      title: "Error fetching user",
      description: "Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
};

// Fetch user profile using authenticated API client
export const getUserProfile = async () => {
  try {
    // useStackAuthApi is a hook, must be used inside a React component or hook
    // We'll provide a helper hook for React Query
    throw new Error(
      "getUserProfile should be called via useUserProfileQuery hook"
    );
  } catch (error) {
    console.error("Error fetching user profile", error);
    toast({
      title: "Error fetching user profile",
      description: "Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
};

// Helper hook for React Query
export const useUserProfileQueryFn = () => {
  const { api } = useStackAuthApi();
  return async () => {
    try {
      const response = await api.get("/user/profile"); // Adjust endpoint if needed
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile", error);
      toast({
        title: "Error fetching user profile",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw error;
    }
  };
};
