import { toast } from "@/hooks/use-toast";
import api from "./Axios";

export const fetchEquipment = async () => {
  try {
    const response = await api.get("/equipments/list");
    // console.log("Response data:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment:", error);
  
    toast({
        title: "Error fetching equipment",
        description: "Please try again later.",
        variant: "destructive",
       });
    throw error;
};
}
