
import {loadRoutes} from '$lib/metadata'
import {log} from '$lib'
import { json } from '@sveltejs/kit';

export const prerender = true

export function GET({ url, setHeaders }) {
    log('loading pages.json')

    setHeaders({
        "cache-control": "max-age=3600",
    });

    return json(loadRoutes())
}
