/**
 * Generate search index
 */

import {log} from '$lib'
import {listDocs, loadDoc, localDoc} from '$lib/docs'
import { json } from '@sveltejs/kit';

import MiniSearch from 'minisearch'

export const prerender = true;

export async function GET({ setHeaders }) {
    let lang = 'en'

    log('loading search_index.json lang=', lang)

    setHeaders({
        "cache-control": "max-age=3600",
    });
    
    let slugs = [ ...listDocs('works'), ...listDocs('pages') ]

    let routes = []
    for(let slug of slugs)
        routes.push(localDoc(await loadDoc(slug), lang))

    let stopWords = new Set(['and', 'or', 'to', 'in', 'a', 'the', 'of'])

    const config = {
        idField: 'slug',
        fields: ['slug', 'title', 'body'],
        storeFields: ['slug', 'path', 'title', 'body', 'image', 'layout'],
        processTerm: (term, _fieldName) => {
            term = term.toLowerCase()

            if(stopWords.has(term))
                return null

            return term
        },
    }

    let idx = new MiniSearch(config)
    
    idx.addAll(routes)
    
    log('loaded search_index.json', { routes: routes.length })

    return json({
        config: config,
        index: idx.toJSON(),
    })
}

