import axios from "axios";

// Use the API base URL from environment variables or default to localhost:8080
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add request interceptor for handling errors
apiInstance.interceptors.request.use(config => {
  // You can add headers or other request configurations here
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor for handling errors
apiInstance.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle common errors here
  console.error('API Error:', error.response?.data || error.message);
  return Promise.reject(error);
});
