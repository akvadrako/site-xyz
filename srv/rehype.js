/**
 * Rehype plugins
 * 
 * see https://github.com/syntax-tree/hast#properties
 */

import {resize,srcset} from '$lib/img'
import {readImage} from '$srv/img'

const addClassTags = /^(div|em|strong|b|a|i|p|pre|kbd|blockquote|h\d|code|table|img|del|ul|ol)$/
const debug = false;
   
async function visitNode(node, offset, parents) {
    let parent = parents[0]

    if(debug)
        console.log("rewrite",
            "type:" + node.type,
            "tag:" + node.tagName,
            // node.value, 
            "parents:" + parents,
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

    // transform images
    if(node.type == 'element' && node.tagName == 'img') {
        let src = node.properties.src
        if(src[0] != '/')
            return

        let img = await readImage(src)

        node.properties.src = resize(src, 500)
        node.properties.srcset = srcset(src)
        node.properties.sizes = "50vw"
        node.properties.width = img.width
        node.properties.height = img.height
        node.properties.style = `height: auto; background-image: url(${resize(src, 200)})`
    }

    if ('children' in node && node.children) {
        let offset = 0
        let grandparents = [node, ...parents]

        while (offset < node.children.length) {
            const child = node.children[offset]
            await visitNode(child, offset, grandparents)
            offset += 1
        }
    }
}

export const tagLang = () => async tree => {
    await visitNode(tree, 0, [])
}

