import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-pro-sidebar"],
  },
  css: {
    preprocessorOptions: {
      css: {
        // Cần xử lý các import như CKEditor đúng cách
      },
    },
  },
});
