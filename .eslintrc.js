module.exports = {
  env: {
    es2023: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:jsdoc/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier", "jsdoc"],
  ignorePatterns: ["node_modules", "dist"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
      },
    ],
    "jsdoc/require-param-type": "off",
  },
};
