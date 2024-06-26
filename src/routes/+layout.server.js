
import {loadDoc} from '$srv/docs'
import { assert } from '$lib'
import { error, redirect } from '@sveltejs/kit';

export const prerender = true;

const pathPattern = new RegExp("/(nl|en)/(.+)")

export async function load({ url, fetch }) {
    let m = url.pathname.match(pathPattern)
    let lang, slug

    // extract language
    if(m) {
        lang = m[1]
        slug = m[2]
    } else {
        lang = 'en'

        if(url.pathname == '/en')
            redirect(301, '/en/works')
        
        if(url.pathname == '/nl')
            redirect(301, '/nl/works')
        
        if(url.pathname == '/')
            slug = 'works'
        else
            slug = url.pathname.substr(1)
    }

    // prefix bare paths with 'pages/'
    if(! slug.includes('/')) {
        slug = `pages/${slug}`
    }

    let doc
        
    doc = await loadDoc(slug, lang)

    // TODO
    try {
    } catch(e) {
        error(404, {
            message: `error loading doc: ${e}`
        });
    }

    let data = {
        doc: doc,
        title: doc.title,
        lang: lang,
    }
   
    let resp = await fetch(`/${lang}/works.json`)
    assert(resp.ok, `fetch(/${lang}/works.json) -> ${resp.status}`)
    data.works = (await resp.json()).works
   
    let posts_resp = await fetch(`/${lang}/blog.json`)
    assert(posts_resp.ok)
    data.posts = (await posts_resp.json()).posts

    return data
}
