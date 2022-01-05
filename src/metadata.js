
import {assert, log} from '$lib'

let routes = null

// return list localized routes
export function getRoutes(lang) {
    loadRoutes()

    return Object.values(routes).map(r => localRoute(r, lang))
}

// return localized route
export function getRoute(path, lang) {
    loadRoutes()

    let r = routes[path]
    if(!r) {
        log.error(`no route for ${path}`)
        return {
            path: '/' + lang + path,
            title: path,
        }
    }

    return localRoute(routes[path], lang)
}

////////////////////////////////////////////////////////////////
// Internal

function loadRoutes() {
    if (routes)
       return routes
    
    log('loading routes...')
   
    let pages = import.meta.globEager('/src/routes/**/*.mdx')
    // ...import.meta.globEager('/src/routes/**/*.svelte')
    
    log('loading routes...', { count: pages.length })

    routes = {}

    for (const file in pages) {
        const mod = pages[file]
        const path = file.replace('/src/routes/','/').replace('index','').replace('.mdx','')
        const route = {
            path: path,
            ...mod.metadata,
        }

        routes[path.replace('/[lang]', '')] = route
    }
}

// return localized route
function localRoute(route, lang) {
    return {
        path: route.path.replace('[lang]', lang),
        title: route['title_' + lang] || route.title,
        text: route._text,
    }
}
