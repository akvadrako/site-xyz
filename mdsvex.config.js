
import { tagLang } from './src/rehype.js'
import { wikiLink, extractText, betterImage } from './src/remark.js'

export default {
    "extensions": [".mdx"],
    "smartypants": {
        "dashes": "oldschool"
    },
    "layout": {
        _: "./src/layouts/default.svelte",
        blog: "./src/layouts/blog.svelte",
        work: "./src/layouts/work.svelte",
    },
    "remarkPlugins": [
        [wikiLink, {
            wikiLinkClassName: 'internal wikilink',
            hrefTemplate(permalink) {
                return `/en/${permalink}`
            },
            aliasDivider: '|',
        }],
        [extractText, {}],
        //betterImage,
    ],
    "rehypePlugins": [
        tagLang,
    ]
};

