// @ts-check
// import { defineConfig } from 'astro/config';

// https://astro.build/config
// export default defineConfig({});

import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.SITE_URL || "https://faceless-stacks-directory.vercel.app",

  vite: {
    resolve: {
      alias: {
        "@data": "/src/data"
      }
    }
  },

  integrations: [sitemap()]
});