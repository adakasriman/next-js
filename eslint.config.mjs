import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import preferArrow from "eslint-plugin-prefer-arrow";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
}); 

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended", // ✅ Ensures Prettier is properly integrated
  ),
  {
    plugins: {
      "prefer-arrow": preferArrow,
    },
    rules: {
      "prettier/prettier": "warn", // Warn for formatting issues
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-implicitly-any": "off",
      "react/no-unescaped-entities": "off",
      "prefer-template": "warn", // ✅ Enforces template literals over string concatenation
      "no-useless-concat": "warn", // ✅ Prevents unnecessary string concatenation
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_", // ✅ Ignore function arguments starting with `_`
          varsIgnorePattern: "^_", // ✅ Ignore variables starting with `_`
        },
      ],
    },
  },
];

export default eslintConfig;
