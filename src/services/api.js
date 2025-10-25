import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        console.log('📦 Request Data:', config.data);
      }
    }
    
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
      if (response.data) {
        console.log('📦 Response Data:', response.data);
      }
    }
    return response;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: error.config?.url,
        method: error.config?.method
      });
    }
    
    if (error.response?.status === 401) {
      if (import.meta.env.DEV) {
        console.log('🔴 Unauthorized - clearing auth data');
      }
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post("/users/register", userData),
  login: (credentials) => api.post("/users/login", credentials),
};

// Resource API calls
export const resourceAPI = {
  addResource: (resourceData) => api.post("/resources/add", resourceData),
  getAllResources: () => api.get("/resources/all"),
  updateResourceStatus: (id, status) =>
    api.put(`/resources/update-status/${id}`, { status }),
};

// Borrow API calls
export const borrowAPI = {
  requestBorrow: (borrowData) => api.post("/borrows/request", borrowData),
  getAllBorrows: () => api.get("/borrows/all"),
  updateBorrowStatus: (id, status) =>
    api.put(`/borrows/update/${id}`, { status }),
};

export default api;
