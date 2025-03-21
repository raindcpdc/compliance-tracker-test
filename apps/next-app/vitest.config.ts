import { defineConfig } from "vitest/config"
import { defineConfig as viteDefineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"

export default defineConfig(
  viteDefineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
      globals: true,
      environment: "jsdom",
      include: ["**/*.spec.tsx"],
    },
  })
)
