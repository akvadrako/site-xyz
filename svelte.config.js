import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],

  kit: {
    alias: {
        '$comp': 'src/comp',
    },
    adapter: adapter(),
  },

  preprocess: [
        vitePreprocess(),
        mdsvex(mdsvexConfig)
    ],
};

export default config;
