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
                clearScreen: false,
                resolve: {
                    extensions: ['.svelte', '.js'],
                    alias: {
                        $comp: '/src/comp'
                    }
                },
                optimizeDeps: {
                    exclude: [
                        '@beyonk/svelte-notifications',
                        //'@beyonk/svelte-notifications/store.js',
                    ],
                    include: [
                    /*
                        'lodash',
                        'lodash-es',
                        'ace-builds/src-noconflict/ace',
                        'ace-builds/src-noconflict/ext-searchbox',
                        'ace-builds/src-noconflict/mode-json',
                        'ajv',
                        'classnames',
                        'diff-sequences',
                        'jmespath',
                        'json-source-map',
                        'natural-compare-lite',
                    */
                    ]
                }
            },
	},
        hot: {
            preserveLocalState: true,
        },
	extensions: [".svelte", ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig)]
};

export default config;
