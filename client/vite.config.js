import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/github": "http://localhost:3000",
      "/ascii": "http://localhost:3000",
    },
  },
});
