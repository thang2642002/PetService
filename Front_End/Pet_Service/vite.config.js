import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Chuyển đổi `import.meta.url` sang `__dirname`

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-pro-sidebar"],
  },
});
