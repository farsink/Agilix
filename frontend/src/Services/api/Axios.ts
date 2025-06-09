import axios from "axios";

// Base API configuration
const api = axios.create({
  baseURL: "http://localhost:4000/api/v1", // Base URL for all API requests
  timeout: 10000, // Request timeout
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

// Response interceptor (e.g., for handling errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
