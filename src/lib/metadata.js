
import {listDocs, loadDoc} from '$lib/docs'

/**
 * @returns {Promise<Array>} List of routes
 */
export async function loadRoutes() {
    let slugs = [ ...listDocs('works'), ...listDocs('pages') ]

    let routes = []

    for (const slug of slugs) {
        let doc = await loadDoc(slug)

        const route = {
            path: doc.path,
            ...doc.meta,
        }

        routes[doc.path.replace('/[lang]', '')] = route
    }

    return routes
}

// return localized route
export function localRoute(route, lang) {
    return {
        ...route,
        path: route.path.replace('[lang]', lang),
        title: route['title_' + lang] || route.title_en,
    }
}
