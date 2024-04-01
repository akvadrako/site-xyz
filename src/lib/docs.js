/**
 * Docs Parser
 *
 * Based on MDSVex
 **/

import {unified} from 'unified';
import rehypeExternalLinks from 'rehype-external-links'
import extract_frontmatter from 'remark-frontmatter';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify'
import { retext } from 'retext';
import smartypants from 'retext-smartypants';
import {visit} from 'unist-util-visit';
import yaml from 'js-yaml';
import { parse } from 'svelte/compiler';
import rehypeFormat from 'rehype-format'
import remarkParse from 'remark-parse'
import {VFile} from 'vfile'
import { tagLang } from '../rehype.js'
import { wikiLink, extractText } from '../remark.js'

import fs from 'fs'

export function localDoc(doc, lang) {
    return {
        ...doc,
        path: doc.path.replace('[lang]', lang),
        title: doc['title_' + lang] || doc.title_en,
    }
}

/**
 * return slugs like `pages/home` and `works/mural`
 * @returns Array - List of routes
 */
export function listDocs(folder) {
    return fs.readdirSync(`doc/${folder}`).map(e => {
        return `${folder}/${e.replace('.md', '')}`
    })
}

/**
 * return slugs like `pages/home` and `works/mural`
 * @returns Promise<object> Routes
 */
export async function loadDoc(slug) {
    let filename = `doc/${slug}.md`
    let mdsrc = fs.readFileSync(filename, { encoding: 'utf8' })
    let src = new VFile({
        path: filename,
        value: mdsrc,
    })

    // FIXME - can this be sync
    let result = await parser().process(src)
   
    // extract known fields
    let { 
        path,
        layout,
        image,
        kind,
        title_en,
        title_nl,
        ...meta
    } = /** @type {object} */ (result.data.matter)
    
    if(! path)
        path = `/[lang]/${slug}`.replace('/pages/', '')

    return {
        body: result.value,
        meta,
        path,
        title_nl,
        title_en,
        filename,
        image,
        layout,
        slug,
        kind,
    }
}

export function parser() {
    const toMDAST = unified()
            .use(remarkParse)
            .use(escape_code)
            .use(extract_frontmatter, [{ type: "yaml", marker: "-" }])
            .use(parse_frontmatter)

            .use(smartypants_transformer, { dashes: "oldschool"})
            .use(extractText)

    const toHAST = toMDAST
            .use(remark2rehype, {
                allowDangerousHtml: true,
            })
            .use(tagLang)
            //.use(transform_hast, { layout, layout_mode });

    const processor = toHAST
        // .use(rehypeDocument)
        .use(rehypeExternalLinks, { rel: ['nofollow'] })
        .use(rehypeFormat)
        .use(rehypeStringify,{
            allowDangerousHtml: true,
            allowDangerousCharacters: true,
        });

    return processor
}

function parse_frontmatter(options={}) {
    return (tree, vFile) => {
        visit(tree, 'yaml', (node) => {
            try {
                vFile.data.matter = yaml.load(node.value)
            } catch (e) {
                vFile.messages.push('YAML failed to parse');
            }
        });
    }
}

function escape_code(options={}) {
    const entites = [
        [/</g, '&lt;'],
        [/>/g, '&gt;'],
        [/{/g, '&#123;'],
        [/}/g, '&#125;'],
    ];

    return function (tree) {
        visit(tree, 'code', escape);
        visit(tree, 'inlineCode', escape);

        function escape(node) {
            for (let i = 0; i < entites.length; i += 1) {
                node.value = node.value.replace(entites[i][0], entites[i][1]);
            }
        }
    };
}

function smartypants_transformer(options = {}) {
    const processor = retext().use(smartypants, options);

    return function (tree) {
        visit(tree, 'text', (node) => {
            node.value = String(processor.processSync(node.value));
        });
    };
}
