
import {loadWorks} from '$lib/metadata'
import {log} from '$lib'

export async function get({ params }) {
    // FIXME - handle nl
    const routes = loadWorks('en')

    log('loading pages.json', { routes: routes.length })

    let headers = new Headers()
    headers.append('Content-Type', 'application/json');

    return {
        status: 200,
        headers: headers,
        body: {
            routes: [ ...routes ],
        }
    }
}

