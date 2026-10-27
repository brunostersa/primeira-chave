import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Mesmo atalho do tsconfig: "@/..." aponta para src/.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
