/**
 * Data response
 */

import {listDocs, loadDoc} from '$srv/docs'
import { json, error } from '@sveltejs/kit';

export const prerender = true

function fail(code, msg) {
    console.error(code, msg)
    error(code, msg)
}

export async function GET({ setHeaders, url }) {
    setHeaders({
        "cache-control": "max-age=3600",
    });
   
    let path = url.pathname

    let m = RegExp("^/(en|nl)/([a-z]*).json$").exec(path)
    if(! m)
        fail(404, `regexp failed: ${path}`)

    let lang = m[1]
    let page = m[2]
    let out = {}
    
    if(page == 'blog')
        out = await blog(lang)
    else if(page == 'works')
        out = await works(lang)
    else
        fail(404, `unknown endpoint: ${path}`)

    return json(out)
}

async function blog(lang) {
    let slugs = listDocs('blog')

    let posts = []
    for(let slug of slugs) {
        let doc = await loadDoc(slug, lang)

        posts.push({
            title: doc.title,
            image: doc.image,
            path: doc.path,
            date: doc.date,
            preview: preview(doc.body),
        })
    }

    // newest first
    posts.sort((a, b) => b.date - a.date)

    return {posts}
}

async function works(lang) {
    let slugs = listDocs('works')

    let works = []
    for(let slug of slugs) {
        let doc = await loadDoc(slug, lang)
        works.push({
            title: doc.title,
            image: doc.image,
            kind: doc.kind,
            path: doc.path,
            slug: doc.slug,
            date: doc.date,
        })
    }
   
    // latest first
    works.sort((a, b) => b.date - a.date)

    return { works }
}

// very basic - look at DOMParser or rehypeRetext
function preview(html) {
    let text = html.replace(/(<([^>]+)>)/gi, "")

    return text.substr(0, 100) + '...'
}

