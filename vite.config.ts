import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import imagemin from "vite-plugin-imagemin";

export default defineConfig({
  vite: {
    base: "/",
    plugins: [
      imagemin({
        mozjpeg: { quality: 80 }, // JPEG compression
        pngquant: {
          quality: [0.8, 0.9], // PNG compression
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox",
            },
            {
              name: "removeEmptyAttrs",
              active: true,
            },
          ],
        },
      }),
    ],
    build: {
      assetsInlineLimit: 4096, // Inline small assets (< 4KB)
      rollupOptions: {
        output: {
          // Optimize asset naming for better caching
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (/png|jpe?g|gif|svg|webp|ico/.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      },
    },
  },
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      filter: ({ path }) => !path.includes("?") && !path.includes("wachtlijst"),
    },
  },
});