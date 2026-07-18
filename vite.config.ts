// SPDX-FileCopyrightText: 2026 Copyright 2026, Adam N. Morris
//
// SPDX-License-Identifier: GPL-3.0-only

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  appType: "custom",
  publicDir: false,
  build: {
    lib: {
      entry: {
        main: "themes/anmorris-2026/src/main.ts",
        math: "themes/anmorris-2026/src/math.ts",
      },
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
