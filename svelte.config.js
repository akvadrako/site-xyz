import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
//import adapter from '@sveltejs/adapter-netlify'
import adapter from '@sveltejs/adapter-static'

const myPlugin = {
  name: 'log-request-middleware',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      console.log(req.method, req.url);
      next();
    })
  }
}

const config = {
    kit: {
        adapter: adapter({}),
        target: '#svelte',
        prerender: {
            //crawl: true,
            enabled: true,
            onError: 'fail',
            entries: [
                '*',
                '/en/search_index.json',
                '/nl/search_index.json',
            ],
        },
        vite: {
	    plugins: [ myPlugin ],
            logLevel: 'info',
            clearScreen: false,
            resolve: {
                extensions: ['.svelte', '.js'],
                alias: {
                    $comp: '/src/comp'
                }
            },
            optimizeDeps: {
                exclude: [
                    //'@beyonk/svelte-notifications',
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
        // experimental: {
        //     //prebundleSvelteLibraries: true;
        // }
    },
    extensions: [".svelte", ...mdsvexConfig.extensions],
    preprocess: [mdsvex(mdsvexConfig)]
};

console.log('config', process.env.NODE_ENV)
if(process.env.NODE_ENV == 'development') {
    config.hot =  {
        preserveLocalState: true,
    }
} else {
}

export default config;
