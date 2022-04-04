/**
 * Rehype plugins
 * 
 * see https://github.com/syntax-tree/hast#properties
 */

import rehypeRewrite from 'rehype-rewrite';

const addClassTags = /^(em|strong|b|a|i|p|pre|kbd|blockquote|h\d|code|table|img|del|ul|ol)$/

export const tagLang = () => {
    return rehypeRewrite({
        rewrite: (node, index, parent) => {
            // set language based on [nl] and [en] tags

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

            // 

            if(node.type == 'element' && addClassTags.test(node.tagName)) {
                node.properties.className = ('md ' + (node.properties.className || '')).trim()
            }
        }
    })
}

/******************************************************************************
 * extras
 */

import {toString} from 'mdast-util-to-string'
import visit from 'unist-util-visit'

const extractText = () => (tree, vFile) => {

    console.log('extractText', tree, vFile, toString)

    let text = toString(tree)

    tree.children.push({
        type: 'element',
        tagName: 'script',
        properties: {
            context: 'module',
        },
        children: [
            {
                type: 'text',
                value: `
    export const text = ${JSON.stringify(text)};
`,
            },
        ],
    })
}

