/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useUser } from "@stackframe/stack";
import { useCallback } from "react";
type AuthToken = {
  accessToken: string | null;
  refreshToken: string | null;
};
// Enhanced API client that integrates with Stack Auth
class StackAuthApiClient {
  private axiosInstance: AxiosInstance;
  private getAccessToken: (() => Promise<AuthToken | null>) | null = null;

  constructor(baseURL: string = "http://localhost:5000/api/v1") {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      withCredentials: true, // Important: Include cookies for Stack Auth
    });

    this.setupInterceptors();
  }

  // Set the token getter function (from Stack Auth)
  setTokenGetter(tokenGetter: () => Promise<AuthToken | null>) {
    this.getAccessToken = tokenGetter;
  }

  private setupInterceptors() {
    // Request interceptor - adds Stack Auth token automatically
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          // Get fresh access token from Stack Auth
          if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
          } else if (config.data) {
            config.headers["Content-Type"] = "application/json";
          }
          if (this.getAccessToken) {
            const token = await this.getAccessToken();
            if (token) {
              config.headers["AccessToken"] = token.accessToken;
              config.headers["X-Refresh-Token"] = token.refreshToken;
            }
          }
          console.log("Request Data:", {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data,
          });
        } catch (error) {
          console.warn("Failed to get access token:", error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handles auth errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          console.warn(
            "Unauthorized request - user may need to re-authenticate"
          );
          // You can trigger a re-authentication flow here if needed
        }
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Expose axios methods with automatic auth
  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.get<T>(url, config);
    return response;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response;
  }
}

// Custom hook that provides authenticated API client
export function useStackAuthApi() {
  const user = useUser(); // Stack Auth's built-in user hook

  // Create API client instance
  const apiClient = new StackAuthApiClient();

  const getAccessToken = useCallback(async (): Promise<AuthToken | null> => {
    try {
      if (!user) return null;

      // Use user.getAuthJson() instead of stackApp.getAccessToken()
      const authJson = await user.getAuthJson();

      return authJson;
    } catch (error) {
      console.error("Failed to get access token:", error);
      return null;
    }
  }, [user]);

  // Configure the API client with Stack Auth token getter
  apiClient.setTokenGetter(getAccessToken);

  return {
    api: apiClient,
    user, // Current user from Stack Auth
    isAuthenticated: !!user,
    userId: user?.id || null,
  };
}
