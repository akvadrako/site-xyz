
import {assert, log} from '$lib'

const pages_mds = import.meta.globEager('/src/routes/**/*.md')
const pages = [] //import.meta.globEager('/src/routes/**/*.svelte')

const modules = {...pages_mds, ...pages}

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
    routes = {}

    for (const file in modules) {
        const mod = modules[file]
        const path = file.replace('/src/routes/','/').replace('index','').replace('.md','')
        const route = {
            path: path,
            ...mod.metadata,
        }
        //log('add route', route)

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
