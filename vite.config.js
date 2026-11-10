import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the site works from a GitHub Pages subfolder
  base: "./",
  plugins: [
    react(),
    tailwindcss(), // add it to the plugins array
  ],
});
