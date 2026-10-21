import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "@tailwindcss/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
