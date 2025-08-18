import eslintPluginAstro from "eslint-plugin-astro";

export default [
  // JavaScript files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        navigator: "readonly",
        console: "readonly",
        structuredClone: "readonly",
      },
    },
    rules: {
      // Core rules
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-undef": "error",
      "no-console": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-debugger": "error",
      "no-duplicate-case": "error",
      "no-empty": "error",
      "no-extra-semi": "error",
      "no-unreachable": "error",
    },
  },

  // TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "off", // TS handles this
      "no-undef": "off", // TS handles this
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },

  // Astro files - use flat config
  ...eslintPluginAstro.configs["flat/recommended"],

  // Additional rules for Astro files
  {
    files: ["**/*.astro"],
    rules: {
      // Apply our standard rules to Astro frontmatter
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Test files
  {
    files: ["**/*.test.{js,ts}", "tests/**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly",
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        navigator: "readonly",
        console: "readonly",
        structuredClone: "readonly",
      },
    },
    rules: {
      "no-unused-expressions": "off",
      "no-undef": "off",
      "no-unused-vars": "off",
      quotes: ["error", "double"],
    },
  },

  // Config files
  {
    files: ["*.config.{js,ts,mjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        process: "readonly",
        __dirname: "readonly",
        console: "readonly",
        structuredClone: "readonly",
      },
    },
    rules: {
      quotes: ["error", "double"],
    },
  },

  // Ignore patterns
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      "coverage/**",
      "*.min.js",
      "*.min.css",
    ],
  },
];
