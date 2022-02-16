
import {loadWorks} from '$lib/metadata'
import {log} from '$lib'

export async function get({ params }) {
    // FIXME - handle nl
    const routes = loadWorks('en')

    log('loading pages.json', { routes: routes.length })

    return {
        body: routes,
    }
}

