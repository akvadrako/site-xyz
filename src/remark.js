/**
 * Remark Plugins
 */

import strip from 'strip-markdown'
import visit from 'unist-util-visit'
//import _ from 'lodash-es'

export const extractText = () => async function(tree, vFile) {

    const toString = (await import('mdast-util-to-string')).toString

    let text = ''

    visit(tree, (node) => {
        if(node.type == 'yaml' || !node.value)
            return

        if(node.value.includes('<script') || node.value.includes('<style'))
            return

        if(node.value) {
            text += ' ' + node.value
                .replace(/<[^>]*>?/gm, '')
                .replace(/\s+/gm, ' ')
        }
    });

    console.log('extractText', vFile.filename)

    if (! vFile.data.fm)
        vFile.data.fm = {};
    
    vFile.data.fm._text = text
}

/**
 * {
  type: 'image',
  url: 'https://example.com/favicon.ico',
  title: 'bravo',
  alt: 'alpha'
}
*/
export const betterImage = () => async tree => {
    visit(tree, "image", node => {
        const relativeUrl = node.url.replace(/^\//, "")

        node.url = new URL(relativeUrl, options.absolutePath).href
    })
}

export const saveHeadings = () => async (tree, vFile) => {
    visit(tree, 'heading', (node) => {
        vFile.data.headings.push({
            level: node.depth,
            title: tree_to_string(node),
        });
    });
}

function extra() {
    for(let child of tree.children) {
        console.log(child)
        if(child.type == 'yaml' || child.value.includes('<script>'))
            continue

        text = text + toString(tree)
    }
}

