
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
//import adapter from '@sveltejs/adapter-netlify'
import adapter from '@sveltejs/adapter-static'
import WindiCSS from 'vite-plugin-windicss'

const myPlugin = {
  name: 'log-request-middleware',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      console.log(req.method, req.url);
      return next();
    })
  }
}

const config = {
    kit: {
        adapter: adapter({}),
        vite: {
	    plugins: [
                myPlugin,
                WindiCSS(),
            ],
            logLevel: 'info',
            clearScreen: false,
            resolve: {
                extensions: ['.svelte', '.js', '.mdx'],
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
   // config.hot =  {
   //     preserveLocalState: true,
   // }
} else {
    config.kit.prerender = { 
        crawl: true,
        enabled: true,
        onError: 'fail',
        entries: [
            '*',
            '/data/search_index.json',
        ],
    }
}

export default config;
