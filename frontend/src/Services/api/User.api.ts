import { toast } from "@/hooks/use-toast";
import api from "./Axios";

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
}