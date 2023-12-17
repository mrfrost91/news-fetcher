module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:prettier/recommended",
    "prettier"
  ],
  ignorePatterns: [
    "dist",
    "node_modules",
    ".eslintrc.cjs"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "react-refresh",
    "prettier"
  ],
  rules: {
    "import/no-cycle": 1,
    "import/prefer-default-export": "off",
    "react/function-component-definition": [
      2,
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react-refresh/only-export-components": [
      "warn",
      {
        "allowConstantExport": true
      }
    ]
  }
}
