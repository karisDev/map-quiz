import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `http://79.137.197.233/map-quiz/`,
  // host localhost
  server: {
    host: "localhost",
    port: 3000,
  },
});
