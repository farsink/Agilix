// src/services/equipmentApi.ts
import axios from "axios";

// Base API configuration
const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  timeout: 10000,
});
export default api;
