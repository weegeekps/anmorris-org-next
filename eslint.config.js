// SPDX-FileCopyrightText: 2026 Adam N. Morris
//
// SPDX-License-Identifier: GPL-3.0-only

import js from "@eslint/js";
import ts from "typescript-eslint";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["**/*.js", "**/*.ts"],
  },
];
