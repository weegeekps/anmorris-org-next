import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  appType: "custom",
  publicDir: false,
  build: {
    lib: {
      entry: ["src/main.js"],
      fileName: "main",
      formats: ["es"],
    },
    outDir: "./public",
    emptyOutDir: false,
    manifest: true,
    assetsDir: "",
  },
  plugins: [tailwindcss()],
  server: {
    port: 8081,
  },
});
