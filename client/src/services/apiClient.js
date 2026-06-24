import axios from "axios";

const rawUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "");

if (import.meta.env.PROD && !rawUrl) {
  throw new Error(
    "[apiClient] VITE_API_BASE_URL is not configured for production."
  );
}

const baseURL = rawUrl || "http://localhost:5000";

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
