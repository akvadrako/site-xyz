import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
//import adapter from '@sveltejs/adapter-netlify'
import adapter from '@sveltejs/adapter-static'

const config = {
	kit: {
            adapter: adapter({}),
            // currently the adapter does not take any options
            target: '#svelte',
            prerender: {
                crawl: true,
                enabled: true,
                onError: 'continue',
                entries: ['*'],
            },
            vite: {
                resolve: {
                    extensions: ['.svelte', '.js'],
                    alias: {
                        $comp: '/src/comp'
                    }
                },
            },
	},
	extensions: [".svelte", ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig)]
};

export default config;
