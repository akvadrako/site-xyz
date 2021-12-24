/**
 * Rehype plugins
 */

import rehypeRewrite from 'rehype-rewrite';

const tagLang = () => {
    return rehypeRewrite({
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
    })
}

export default { tagLang }

/******************************************************************************
 * extras
 */

const extractText = () => async function(tree, vFile) {
    const toString = (await import('mdast-util-to-string')).toString
    const visit = (await import('unist-util-visit')).visit

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

