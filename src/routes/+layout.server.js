
import {loadDoc, localDoc} from '$lib/docs'
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

    try {
        doc = localDoc(await loadDoc(slug), lang)
    } catch(e) {
        error(404, {
            message: `error loading doc: ${e}`
        });
    }

    console.log('loadedDoc', doc)

    let data = {
        doc: doc,
        title: doc.title,
        lang: lang,
    }
   
    let resp = await fetch('/data/pages.json')
    let body = await resp.json()
    
    data.works = body.works.map(w => localDoc(w, lang))
    
    let posts_data = await (await fetch(`/${lang}/blog.json`)).json()

    data.posts = posts_data.posts
    return data
}
