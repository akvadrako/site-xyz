
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

export function loadWorks(lang) {
    const works = []

    let pages = import.meta.globEager('/src/routes/[lang]/works/*.mdx')

    for (const file in pages) {
        const mod = pages[file]

        const path = file.replace('/src/routes/','/').replace('index','').replace('.mdx','')
        const route = {
            path: path,
            ...mod.metadata,
        }

        works.push(localRoute(route, lang))
    }

    return works
}


////////////////////////////////////////////////////////////////
// Internal

function loadRoutes() {
    if (routes)
       return routes
    
    let mds = import.meta.globEager('/src/routes/**/*.mdx')
    let srcs = import.meta.globEager('/src/routes/**/*.svelte')
   
    let pages = { ...mds, ...srcs }

    log('loading routes...', { count: Object.values(pages).length })

    routes = {}

    for (const file in pages) {
        const mod = pages[file]

        if(! mod.metadata || mod.metadata.hide)
            continue

        const path = file.replace('/src/routes/','/').replace('index','').replace('.mdx','').replace('.svelte', '')
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
        ...route,
        path: route.path.replace('[lang]', lang),
        title: route['title_' + lang] || route.title,
    }
}
