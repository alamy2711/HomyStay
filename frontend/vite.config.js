import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@contexts": path.resolve(__dirname, "./src/contexts"),
        },
    },

    plugins: [react(), tailwindcss()],
});
