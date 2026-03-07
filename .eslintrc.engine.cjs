module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["src/engine/**/*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              { name: "react", message: "Engine must not import React." },
              { name: "../content", message: "Engine must not import from content." },
              { name: "../../content", message: "Engine must not import from content." },
              { name: "../game", message: "Engine must not import from game." },
              { name: "../../game", message: "Engine must not import from game." },
              { name: "../registry", message: "Engine must not import registry." },
              { name: "../../registry", message: "Engine must not import registry." }
            ],
            patterns: [
              "**/content/**",
              "**/game/**",
              "**/registry.{js,ts}"
            ]
          }
        ]
      }
    }
  ]
};
