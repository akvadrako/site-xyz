
import wikiLinkPlugin from 'remark-wiki-link'
import resolution from 'rehype-resolution'

import rehypePlugins from './src/rehype.js'
import remarkPlugins from './src/remark.js'

export default {
    "extensions": [".mdx"],
    "smartypants": {
        "dashes": "oldschool"
    },
    "layout": {
        _: "./src/layouts/default.svelte",
        blog: "./src/layouts/blog.svelte",
    },
    "remarkPlugins": [
        [wikiLinkPlugin, {
            wikiLinkClassName: 'internal wikilink',
            hrefTemplate(permalink) {
                return `/en/${permalink}`
            },
            aliasDivider: '|',
        }],
        remarkPlugins.extractText,
    ],
    "rehypePlugins": [
        resolution,
        rehypePlugins.tagLang,
    ]
};

