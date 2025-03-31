import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Explicitly set port
    host: "0.0.0.0", // Expose server to external network
    strictPort: true, // Prevents fallback to a different port
  },
});



