import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const basename = path.basename(filename);
        const componentName = basename.split(".module.scss")[0];
        return `${componentName}-${name}`;
      },
    },
  },
  plugins: [react()],
});
