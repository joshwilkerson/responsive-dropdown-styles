import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves a project site from /<repo>/, so built asset URLs need
  // that prefix. Left as "/" for `vite dev` and `vite preview`.
  base:
    process.env.NODE_ENV === "production"
      ? "/responsive-dropdown-styles/"
      : "/",
  build: {
    // lightningcss can't yet parse the `::picker()` pseudo-element that
    // @planningcenter/tapestry's bundled CSS uses for its Select component.
    cssMinify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        preview: resolve(__dirname, "preview.html"),
      },
    },
  },
})
