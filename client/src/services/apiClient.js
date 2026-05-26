import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("heritageAccessToken")
      : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
