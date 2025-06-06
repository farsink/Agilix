import { useQuery } from "@tanstack/react-query";
import { fetchEquipment } from "../Services/api/equipment.api";

export const useEquipment = () => {
  return useQuery({
    queryKey: ["equipment"],
    queryFn: fetchEquipment,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    // cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};
