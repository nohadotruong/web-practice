import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindscss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindscss()],
});
