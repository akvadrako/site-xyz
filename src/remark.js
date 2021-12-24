/**
 * Remark Plugins
 */

import strip from 'strip-markdown'
import visit from 'unist-util-visit'
import _ from 'lodash'

const extractText = () => async function(tree, vFile) {

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

function visiter(tree, vFile) {
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

export default { extractText }
