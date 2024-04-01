
import {log, loadDoc} from '$lib'

export const prerender = true;

const pathPattern = new RegExp("/(nl|en)(/.+)")

export async function load({ url, fetch }) {
    let m = url.pathname.match(pathPattern)
    let lang, slug

    // extract language
    if(m) {
        lang = m[0]
        slug = m[1]
    } else {
        lang = 'en'
        slug = url.pathname.substr(1)
    }

    // default
    if(slug == '') {
        slug = 'pages/home'
    }

    // prefix bare paths with 'pages/'
    if(! slug.includes('/')) {
        slug = `pages/${slug}`
    }

    let doc = await loadDoc(slug)
    let data = {
        meta: doc.meta,
        body: doc.body,
        title: doc.meta[`title_${lang}`],
        lang: lang,
    }
   
    // conditionally load more
    if(slug == 'pages/home') {
        let resp = await fetch('/data/pages.json')
        let body = await resp.json()
        data.routes = body.routes
    }

    log("$page.data.body.length=${data.body.length}")
    return data
}
