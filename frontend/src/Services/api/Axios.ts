import axios from "axios";
import { classifyError } from "@/utils/errorHandling";

// Base API configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER || "http://localhost:4000/api/v1", // Base URL for all API requests
  timeout: 15000, // Increased timeout to 15 seconds
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Request interceptor (e.g., for adding auth tokens)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Example: Fetch token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with enhanced error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Classify the error for better handling
    const classifiedError = classifyError(error);
    
    // Log detailed error information for debugging
    console.error("API Error Details:", {
      type: classifiedError.type,
      message: classifiedError.message,
      statusCode: classifiedError.statusCode,
      retryable: classifiedError.retryable,
      originalError: error.response || error.message
    });
    
    // Return the classified error for better handling upstream
    return Promise.reject(classifiedError);
  }
);

export default api;
