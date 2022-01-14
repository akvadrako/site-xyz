/**
 * Remark Plugins
 */

import strip from 'strip-markdown'
import visit from 'unist-util-visit'
//import _ from 'lodash-es'
    
import { toString } from 'mdast-util-to-string'

export const extractText = () => (tree, vFile) => {
    console.log('TEXT', vFile.filename)

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
export const betterImage = () => tree => {
    visit(tree, "image", node => {
        const relativeUrl = node.url.replace(/^\//, "")

        node.url = new URL(relativeUrl, options.absolutePath).href
    })
}

export const saveHeadings = () => (tree, vFile) => {
    visit(tree, 'heading', (node) => {
        vFile.data.headings.push({
            level: node.depth,
            title: tree_to_string(node),
        });
    });
}

import {map} from 'unist-util-map';

export function wikiLink(opts) {
    const LINK_REGEX = /^\[\[(.+?)\]\]/;

    let permalinks = opts.permalinks || [];
    let defaultPageResolver = (name) => [name.replace(/ /g, '_').toLowerCase()];
    let pageResolver = opts.pageResolver || defaultPageResolver
    let newClassName = opts.newClassName || 'new';
    let wikiLinkClassName = opts.wikiLinkClassName || 'internal';
    let defaultHrefTemplate = (permalink) => `#/page/${permalink}`
    let hrefTemplate = opts.hrefTemplate || defaultHrefTemplate
    let aliasDivider = opts.aliasDivider || ":";

    function isAlias(pageTitle) {
        return pageTitle.indexOf(aliasDivider) !== -1;
    }

    function parseAliasLink(pageTitle) {
        var [name, displayName] = pageTitle.split(aliasDivider);
        return { name, displayName }
    }

    function parsePageTitle(pageTitle) {
        if (isAlias(pageTitle)) {
            return parseAliasLink(pageTitle)
        }
        return {
            name: pageTitle,
            displayName: pageTitle
        }
    }

    function inlineTokenizer(eat, value) {
        let match = LINK_REGEX.exec(value);

        if (match) {
            const pageName = match[1].trim();
            const { name, displayName } = parsePageTitle(pageName)

            let pagePermalinks = pageResolver(name);
            let permalink = pagePermalinks.find(p => permalinks.indexOf(p) != -1);
            let exists = permalink != undefined;

            if (!exists) {
                permalink = pagePermalinks[0];
            }

            let classNames = wikiLinkClassName;
            if (!exists) {
                classNames += ' ' + newClassName;
            }

            return eat(match[0])({
                type: 'wikiLink',
                value: name,
                data: {
                    alias: displayName,
                    permalink: permalink,
                    exists: exists,
                    hName: 'a',
                    hProperties: {
                        className: classNames,
                        href: hrefTemplate(permalink)
                    },
                    hChildren: [{
                        type: 'text',
                        value: displayName
                    }]
                },
            });
        }
    }

    function locator (value, fromIndex) {
        return value.indexOf('[', fromIndex)
    }

    inlineTokenizer.locator = locator

    const Parser = this.Parser

    const inlineTokenizers = Parser.prototype.inlineTokenizers
    const inlineMethods = Parser.prototype.inlineMethods
    
    inlineTokenizers.wikiLink = inlineTokenizer
    inlineMethods.splice(inlineMethods.indexOf('link'), 0, 'wikiLink')

    function handler(tree, vFile) {
        visit(tree, 'wikiLink', (node) => {
            if (node.data.alias != node.value) {
                return `[[${node.value}${aliasDivider}${node.data.alias}]]`
            }
            return `[[${node.value}]]`
        });
    }

    return handler
}

function extra() {
    for(let child of tree.children) {
        console.log(child)
        if(child.type == 'yaml' || child.value.includes('<script>'))
            continue

        text = text + toString(tree)
    }
}

