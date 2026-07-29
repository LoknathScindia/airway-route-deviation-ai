import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Register
export const register = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// Login
export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);

  if (response.data.access_token) {
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("token_type", response.data.token_type);
  }

  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token_type");
};

// Check Login
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

export default API;