
import {assert, log} from '$lib'

let routes = null

const pathPages = '/src/routes/[lang=lang]'
const pathWorks = '/src/works'

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

    let pages = import.meta.glob('/src/works/*.mdx', { eager: true })

    for (const file in pages) {
        const mod = pages[file]

        const path = file.replace(pathWorks,'/[lang]/works').replace('index','').replace('.mdx','')
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
    
    let mds = import.meta.glob('/src/routes/[lang=lang]/**/*.mdx', { eager: true })
    let srcs = import.meta.glob('/src/routes/[lang=lang]/**/*.svelte', { eager: true })
   
    let pages = { ...mds, ...srcs }

    routes = {}

    for (const file in pages) {
        const mod = pages[file]

        if(! mod.metadata || mod.metadata.hide)
            continue

        console.log('path', file, mod.metadata)

        const path = file.replace(pathPages,'/[lang]').replace('index','').replace('.mdx','').replace('.svelte', '')
        const route = {
            path: path,
            text: mod.metadata._text,
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
        bare_path: route.path.replace('[lang]/', ''),
        title: route['title_' + lang] || route.title_en,
    }
}
