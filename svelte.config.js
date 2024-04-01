import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte"],
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-'))
        return;
   
    if (warning.message.startsWith('Unused'))
        return;

    warning.message = `[${warning.code}] ${warning.message}`
    handler(warning);
  },
  kit: {
    alias: {
        '$comp': 'src/comp',
    },
    adapter: adapter(),
  },

  preprocess: [
        vitePreprocess(),
    ],
};

export default config;
