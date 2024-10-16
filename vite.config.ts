import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    // root: 'public',  // ? Путь к директории с index.html
    plugins: [react()],
    build: {
        target: "esnext",
        outDir: "dist", // Путь для сборки, относительно `root`
    },
    server: {
        // open: true,  // Откроет браузер автоматически
    },
});
