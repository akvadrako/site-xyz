
import {getRoutes} from '/src/metadata'
import {log} from '$lib'
import MiniSearch from 'minisearch'

export async function get({ params }) {
    // FIXME - handle nl
    const routes = getRoutes('en')

    log('loading search_index.json', { routes: routes.length })

    const config = {
        idField: 'path',
        fields: ['path', 'title', 'text'],
        storeFields: ['title', 'path', 'text']
    }

    let idx = new MiniSearch(config)
    
    idx.addAll(routes)

    return {
        body: {
            config: config,
            index: idx.toJSON(),
        }
    }
}

