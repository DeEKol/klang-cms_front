import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
    // root: 'public',  // ? Путь к директории с index.html
    plugins: [react()],
    build: {
        target: "esnext",
        outDir: "dist", // Путь для сборки, относительно `root`
    },
    server: {
        // proxy: {
        //     "/api": {
        //         target: "http://localhost:3000",
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, ""),
        //     },
        // },
        // open: true,  // Откроет браузер автоматически
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, "src/app"),
            pages: path.resolve(__dirname, "src/pages"),
            widgets: path.resolve(__dirname, "src/widgets"),
            features: path.resolve(__dirname, "src/features"),
            entities: path.resolve(__dirname, "src/entities"),
            shared: path.resolve(__dirname, "src/shared"),
        },
    },
});
