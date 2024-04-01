/**
 * Rehype plugins
 * 
 * see https://github.com/syntax-tree/hast#properties
 */

import { visit } from 'unist-util-visit'

const addClassTags = /^(div|em|strong|b|a|i|p|pre|kbd|blockquote|h\d|code|table|img|del|ul|ol)$/
const debug = false;

export const tagLang = () => tree => {
    visit(tree, (node, _, parent) => {
        if(debug)
            console.log("rewrite",
                node,
                node.type, node.tagName, node.value, 
                "parent:",
                parent && parent.properties,
                parent && parent.tagName,
            )

        // set language based on [nl] and [en] tags
        if(node.type == 'text') {
            let m = node.value.match(/\s*\[(nl|en)\]\s*/)
            if(m) {
                parent.properties.lang = m[1]
                let old = node.value
                node.value = node.value.substr(m[0].length)
            }
        }

        // add md class to all elements
        if(node.type == 'element' && addClassTags.test(node.tagName)) {
            node.properties.className = ('md ' + (node.properties.className || '')).trim()
        }
    });
}
