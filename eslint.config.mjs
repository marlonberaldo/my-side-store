import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:tailwindcss/recommended"),
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": ["warn"],
      "eqeqeq": ["error", "always"],
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "sort-imports": ["error", {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true
      }],
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type"
          ],
          "pathGroups": [
            {
              "pattern": "react",
              "group": "builtin",
              "position": "before"
            },
            {
              "pattern": "next",
              "group": "builtin",
              "position": "before"
            },
            {
              "pattern": "next/**",
              "group": "builtin",
              "position": "before"
            },
            {
              "pattern": "@next/**",
              "group": "builtin",
              "position": "before"
            },
            {
              "pattern": "@/components/**",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "@/_components/**",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "./**/components/**",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "./**/_components/**",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "@/lib/**",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "@/services/**",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "@/utils/**",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "@/queries/**",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "@/hooks/**",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "@/types/**",
              "group": "internal",
              "position": "before"
            }
          ],
          "pathGroupsExcludedImportTypes": [
            "builtin"
          ],
          "newlines-between": "always"
        }
      ]
    }
  }
];

export default eslintConfig;
