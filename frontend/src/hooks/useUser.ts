import { useQuery } from "@tanstack/react-query";
import { useUserProfileQueryFn } from "@/Services/api/User.api";


// Key for caching user profile data
const USER_PROFILE_QUERY_KEY = ["userProfile"];

/**
 * useUserProfile
 * Fetches and caches the authenticated user's profile using TanStack Query.
 */
export function useUserProfile(options = {}) {
  const queryFn = useUserProfileQueryFn();
  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    ...options,
  });
}
