// SPDX-FileCopyrightText: 2026 Copyright 2026, Adam N. Morris
//
// SPDX-License-Identifier: GPL-3.0-only

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  appType: "custom",
  publicDir: false,
  input: {
    main: "themes/anmorris-2026/src/main.ts",
    math: "themes/anmorris-2026/src/math.ts",
    style: "themes/anmorris-2026/src/style.css",
  },
  build: {
    outDir: "./static/bundle",
    emptyOutDir: true,
    manifest: true,
    assetsDir: "",
  },
  plugins: [tailwindcss()],
  server: {
    port: 8081,
    strictPort: true,
    origin: "http://localhost:8081",
    cors: {
      origin: "http://localhost:8080",
    },
  },
});
