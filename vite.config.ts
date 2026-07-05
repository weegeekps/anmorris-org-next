import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  appType: "custom",
  publicDir: false,
  build: {
    lib: {
      entry: ["themes/anmorris-2026/src/main.ts"],
      fileName: "main",
      formats: ["es"],
    },
    outDir: "./static/bundle",
    emptyOutDir: false,
    manifest: true,
    assetsDir: "",
  },
  plugins: [tailwindcss()],
  server: {
    port: 8081,
  },
});
