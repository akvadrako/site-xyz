import { defineMDSveXConfig as defineConfig } from "mdsvex";

import { tagLang } from './src/rehype.js'
import { wikiLink, extractText } from './src/remark.js'

const config = defineConfig({
    extensions: [".mdx"],

    smartypants: {
        dashes: "oldschool",
    },
    layout: {
        _: "./src/layouts/default.svelte",
        blog: "./src/layouts/blog.svelte",
        work: "./src/layouts/work.svelte",
    },

    remarkPlugins: [
        [wikiLink, {
            wikiLinkClassName: 'internal wikilink',
            hrefTemplate(permalink) {
                return `/en/${permalink}`
            },
            aliasDivider: '|',
        }],
        [extractText, {}],
    ],
    rehypePlugins: [
        tagLang,
    ],
});

export default config;

