import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    coverage: {
      include: ["src/**/*.{js,ts}"],
      exclude: [
        "src/**/*.astro",
        "src/content/**",
        "src/pages/**",
        "src/layouts/**",
        "src/consts.ts",
        "src/content.config.ts",
      ],
      reporter: ["text", "lcov"],
    },
  },
});
