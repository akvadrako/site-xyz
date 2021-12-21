
import wikiLinkPlugin from 'remark-wiki-link'
import resolution from 'rehype-resolution'
import rehypeRewrite from 'rehype-rewrite';

export default {
    "extensions": [".md"],

    "smartypants": {
        "dashes": "oldschool"
    },
    "layout": {
        _: "./src/layouts/default.svelte"
    },
    "remarkPlugins": [
        [wikiLinkPlugin, {
            wikiLinkClassName: 'internal wikilink',
            hrefTemplate(permalink) {
                return `/en/${permalink}`
            },
            aliasDivider: '|',
        }],
    ],
    "rehypePlugins": [
        [resolution, {

        }],
        [rehypeRewrite, {
            // https://github.com/syntax-tree/hast#properties
            rewrite: (node, index, parent) => {
                if(node.type == 'text' && node.value == '[nl]') {
                    //console.log(node.type, node.value, parent.properties)
                    parent.properties.lang = 'nl'
                    node.value = ''
                }
                if(node.type == 'text' && node.value == '[en]') {
                    //console.log(node.type, node.value, parent.properties)
                    parent.properties.lang = 'en'
                    node.value = ''
                }
            }
        }],
    ]
};

