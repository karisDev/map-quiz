import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/map-quiz`,
  // host localhost
  server: {
    host: true,
    port: 3000,
  },
});
