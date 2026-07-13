import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist/**", "node_modules/**"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.flat["recommended-latest"].rules,
      ...reactRefresh.configs.vite.rules,
    },
  },
  {
    files: ["src/shared/ui/**/*.{ts,tsx}", "src/shared/lib/theme.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
]);
