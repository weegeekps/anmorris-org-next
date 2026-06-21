import js from "@eslint/js";
import ts from "typescript-eslint";

export default ts.config(
    js.configs.recommended,
    ts.configs.recommended,
    {
        files: ["themes/anmorris-2026/src/**/*.ts"],
    },
);
