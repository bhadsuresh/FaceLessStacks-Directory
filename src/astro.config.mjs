

// @ts-check
// import { defineConfig } from 'astro/config';

// https://astro.build/config
// export default defineConfig({});

import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "http://localhost:4321",
  vite: {
    resolve: {
      alias: {
        "@data": "/src/data"
      }
    }
  }
});
