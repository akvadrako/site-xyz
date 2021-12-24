
import {getRoutes} from '/src/metadata'
import {log} from '$lib'

export async function get({ params }) {
    log('loading search.json')

    // FIXME - handle nl
    const routes = getRoutes('en')

    let keys = [
        {
            name: 'title',
            weight: 1.0
        },
        {
            name: 'path',
            weight: 0.5
        },
        {
            name: 'text',
            weight: 0.2
        },
    ]


    return {
        body: {
            keys: keys,
            routes: routes,
            index: idx.toJSON(),
        }
    }
}

