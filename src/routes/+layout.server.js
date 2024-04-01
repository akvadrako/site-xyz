
import {loadDoc} from '$lib'

export const prerender = true;

const pathPattern = new RegExp("/(nl|en)(/.+)")

export async function load({ url, fetch }) {
    console.log("load +layout")
    
    let routes = fetch('/data/pages.json')

    let lang = 'en'
    let slug = null

    let m = url.pathname.match(pathPattern)

    if(m) {
        lang = m[0]
        if(m[1].startsWith('/works'))
            slug = m[1]
        else
            slug = `pages/${slug}`
    } else if(url.pathname == '/') {
        slug = 'home'
    }

    let content = await loadDoc(slug)

    console.log("load +layout - done")

    let title = content.meta[`title_${lang}`]

    return {
        routes: routes,
        content: content,
        title: title,
        lang: lang,
    }
}
