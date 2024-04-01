/**
 * Rehype plugins
 * 
 * see https://github.com/syntax-tree/hast#properties
 */

import rehypeRewrite from 'rehype-rewrite';

const addClassTags = /^(div|em|strong|b|a|i|p|pre|kbd|blockquote|h\d|code|table|img|del|ul|ol)$/
const debug = false;

export const tagLang = () => {
    return rehypeRewrite({
        rewrite: (node, index, parent) => {
            // set language based on [nl] and [en] tags
            if(debug)
                console.log("rewrite",
                    node.type, node.tagName, node.value, 
                    "parent:",
                    parent && parent.properties,
                    parent && parent.tagName,
                )

            if(node.type == 'text' && node.value == '[nl]') {
                parent.properties.lang = 'nl'
                node.value = ''
            }
            
            if(node.type == 'text' && node.value == '[en]') {
                parent.properties.lang = 'en'
                node.value = ''
            }

            if(node.type == 'element' && addClassTags.test(node.tagName)) {
                node.properties.className = ('md ' + (node.properties.className || '')).trim()
            }
        }
    })
}
