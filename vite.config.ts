import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": {
        target: "http://localhost:4200",
        changeOrigin: true,
        ws: true,
      },
      "/auth": {
        target: "http://localhost:4200",
        changeOrigin: true,
      },
      "/api/chat": {
        target: "http://localhost:4200",
        changeOrigin: true,
      },
      "/messages": {
        target: "http://localhost:4200",
        changeOrigin: true,
      },
      "/users": {
        target: "http://localhost:4200",
        changeOrigin: true,
      },
    },
  },
});
