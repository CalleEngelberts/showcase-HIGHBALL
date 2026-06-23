import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/showcase-HighBall/",
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