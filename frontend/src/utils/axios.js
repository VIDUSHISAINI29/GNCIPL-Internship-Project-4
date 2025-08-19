import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: API_URL, // no auth
});

export const authApi = axios.create({
  baseURL: API_URL,
});

// attach token automatically
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
