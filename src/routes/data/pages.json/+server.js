
import {loadWorks} from '$lib/metadata'
import {log} from '$lib'
import { json } from '@sveltejs/kit';

export const prerender = true

export function GET({}) {
    // FIXME - handle nl
    const routes = loadWorks('en')

    log('loading pages.json', { routes: routes.length })

    return json({
        routes: [ ...routes ],
    })
}
