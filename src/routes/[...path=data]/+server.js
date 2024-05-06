/**
 * Data response
 */

import {listDocs, loadDoc, localDoc} from '$lib/docs'
import {log} from '$lib'
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const prerender = true

export async function GET({ setHeaders, url }) {
    setHeaders({
        "cache-control": "max-age=3600",
    });
   
    let path = url.pathname
    let lang

    if (path == '/en/blog.json') {
        lang = 'en'
    } else if (path == '/nl/blog.json') {
        lang = 'nl'
    } else {
        error(404, `unrecognized data url ${path}`)
    }
    
    let slugs = listDocs('blog')

    let posts = []
    for(let slug of slugs) {
        let doc = localDoc(await loadDoc(slug), lang)

        posts.push({
            title: doc.title,
            image: doc.image,
            path: doc.path,
        })
    }

    return json({
        posts: posts,
    })
}
