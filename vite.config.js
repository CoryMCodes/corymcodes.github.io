import { defineConfig } from "vite"

export default defineConfig({
  build: {
    outDir: "assets/js",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: "src/javascript/application.js",
      output: {
        entryFileNames: "app.js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]"
      }
    }
  }
})
