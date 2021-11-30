import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const basename = path.basename(filename);
        const componentName = basename.replace(".module.scss", "");
        return `${componentName}-${name}`;
      },
    },
  },
  plugins: [react()],
});
