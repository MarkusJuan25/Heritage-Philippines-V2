import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (mode === "production") {
    const apiUrl = env.VITE_API_BASE_URL?.trim();

    if (!apiUrl) {
      throw new Error(
        "[vite] VITE_API_BASE_URL is required for production builds."
      );
    }

    let protocol;
    try {
      protocol = new URL(apiUrl).protocol;
    } catch {
      throw new Error(
        `[vite] VITE_API_BASE_URL is not a valid absolute URL: "${apiUrl}"`
      );
    }

    if (protocol !== "http:" && protocol !== "https:") {
      throw new Error(
        `[vite] VITE_API_BASE_URL must use http: or https: protocol: "${apiUrl}"`
      );
    }
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: 5174,
      strictPort: true,
    },
  };
});
