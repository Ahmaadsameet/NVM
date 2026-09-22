import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // All application secrets belong to the backend runtime environment.
  envDir: false,
  envPrefix: [],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8000"
    },
    watch: {
      ignored: ["**/public/assets/**/*.mp4"]
    }
  }
});
