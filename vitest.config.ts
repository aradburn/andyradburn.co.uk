import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "text-summary", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["components/**/*.{ts,tsx}", "lib/**/*.ts"],
      exclude: [
        "node_modules/",
        "**/__tests__/**",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/*.d.ts",
        "**/SubsectionBackgroundLayers.tsx",
        "**/ScrollPinSection.tsx",
      ],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 80,
      },
    },
  },
});
