import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, mkdirSync } from "node:fs";

export default defineConfig({
  plugins: [react(), {
    name: "copy-not-found-page",
    closeBundle() {
      copyFileSync("dist/index.html", "dist/404.html");
      for (const route of ["impressum", "datenschutz"]) {
        mkdirSync(`dist/${route}`, { recursive: true });
        copyFileSync("dist/index.html", `dist/${route}/index.html`);
      }
    }
  }],
  // The static build needs no environment variables or credentials.
  envDir: false,
  envPrefix: [],
  server: {
    watch: {
      ignored: ["**/public/assets/**/*.mp4"]
    }
  }
});
