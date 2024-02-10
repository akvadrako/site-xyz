
import {getRoutes} from '$lib/metadata'
import {log} from '$lib'
import MiniSearch from 'minisearch'

import { json } from '@sveltejs/kit';

export function GET({}) {
    // FIXME - handle nl
    const routes = getRoutes('en').filter(r => !r.noindex)

    log('loading search_index.json', { routes: routes.length })

    let stopWords = new Set(['and', 'or', 'to', 'in', 'a', 'the', 'of'])

    const config = {
        idField: 'path',
        fields: ['path', 'title', 'text'],
        storeFields: ['title', 'path', 'text', 'image', 'layout'],
        processTerm: (term, _fieldName) => {
            term = term.toLowerCase()

            if(stopWords.has(term))
                return null

            return term
        },
    }

    let idx = new MiniSearch(config)
    
    idx.addAll(routes)

    return json({
        config: config,
        index: idx.toJSON(),
    })
}

