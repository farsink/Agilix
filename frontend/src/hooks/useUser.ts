import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserApi, ApiResponse, IsRegisteredResponse } from "@/Services/api/User.api";
import { useCallback, useRef, useEffect } from "react";
import { ErrorType, ClassifiedError, classifyError } from "@/utils/errorHandling";

// Query keys for caching
const USER_PROFILE_QUERY_KEY = ["user-profile"];
const USER_REGISTRATION_QUERY_KEY = ["user-registration"];

// Hook options interface
interface UseRegistrationStatusOptions {
  enabled?: boolean;
  retryOnMount?: boolean;
  onError?: (error: ClassifiedError) => void;
  onSuccess?: (data: IsRegisteredResponse) => void;
  fallbackBehavior?: 'redirect' | 'show-error' | 'silent';
}

/**
 * useUserProfile
 * Fetches and caches the authenticated user's profile using TanStack Query.
 */
export const useUserProfile = (options = {}) => {
  const { getUserProfile } = useUserApi();
  
  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: async () => {
      const response = await getUserProfile();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry auth errors
      if (error?.type === ErrorType.AUTH) return false;
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};

/**
 * useRegistrationStatus
 * Enhanced hook for checking user registration status with comprehensive error handling
 */
export const useRegistrationStatus = (options: UseRegistrationStatusOptions = {}) => {
  const { IsRegistered } = useUserApi();
  const queryClient = useQueryClient();
  const isMountedRef = useRef(true);
  const retryCountRef = useRef(0);
  
  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const queryResult = useQuery({
    queryKey: USER_REGISTRATION_QUERY_KEY,
    queryFn: IsRegistered,
    enabled: options.enabled !== false,
    staleTime: 1000 * 60 * 2, // cache for 2 minutes
    retry: (failureCount, error: any) => {
      // Don't retry if component is unmounted
      if (!isMountedRef.current) return false;
      
      // Don't retry auth errors - let the component handle redirect
      if (error?.type === ErrorType.AUTH) return false;
      
      // Don't retry client errors (4xx except auth)
      if (error?.type === ErrorType.SERVER && error?.statusCode && 
          error.statusCode >= 400 && error.statusCode < 500) {
        return false;
      }
      
      // Retry network, timeout, and server errors up to 3 times
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s, 4s
      return Math.min(1000 * 2 ** attemptIndex, 8000);
    },
  });

  // Handle side-effects like callbacks
  useEffect(() => {
    if (!isMountedRef.current) return;

    if (queryResult.isSuccess && options.onSuccess) {
      retryCountRef.current = 0; // Reset retry count on success
      options.onSuccess(queryResult.data);
    }
  }, [queryResult.isSuccess, queryResult.data, options.onSuccess]);

  useEffect(() => {
    if (!isMountedRef.current) return;

    if (queryResult.isError && options.onError) {
      retryCountRef.current++;
      console.error('Registration status check failed:', queryResult.error);
      options.onError(queryResult.error as ClassifiedError);
    }
  }, [queryResult.isError, queryResult.error, options.onError]);

  // Manual retry function
  const retry = useCallback(() => {
    if (isMountedRef.current) {
      queryResult.refetch();
    }
  }, [queryResult.refetch]);

  // Manual reset function
  const reset = useCallback(() => {
    if (isMountedRef.current) {
      queryClient.resetQueries({ queryKey: USER_REGISTRATION_QUERY_KEY });
    }
  }, [queryClient]);

  // Expose the isRegistered status directly from the nested data object
  const isRegistered = queryResult.data?.isRegistered;
  console.log("queryResult", queryResult);
  console.log("isRegistered", isRegistered);

  return {
    ...queryResult,
    isRegistered,
    errorInfo: queryResult.error ? classifyError(queryResult.error) : null,
    retry,
    reset,
    retryCount: retryCountRef.current,
    isMounted: isMountedRef.current,
  };
};

/**
 * Prefetch registration status
 * Useful for preloading data before navigation
 */
export const usePrefetchRegistrationStatus = () => {
  const queryClient = useQueryClient();
  const { IsRegistered } = useUserApi();

  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: USER_REGISTRATION_QUERY_KEY,
      queryFn: IsRegistered,
      staleTime: 1000 * 60 * 2,
    });
  }, [queryClient, IsRegistered]);
};
