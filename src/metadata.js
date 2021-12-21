
const pages_mds = import.meta.globEager('/src/routes/**/*.md')
const pages = [] //import.meta.globEager('/src/routes/**/*.svelte')

const modules = {...pages_mds, ...pages}

let routes
let routesBySlug = {}

export function loadRoutes() {
    if (routes)
        return routes
   
    for (const file in modules) {
        if (Object.hasOwnProperty.call(modules, file)) {
            const mod = modules[file]
            const path = file.replace('/src/routes/','/').replace('index','').replace('.md','')

            routesBySlug[path.replace('/', '')] = {
                path: path,
                ...mod.metadata,
            }

            routes.push({
                path: `en/${path}`,
                ...mod.metadata
            })
            routes.push({
                path: `nl/${path}`,
                ...mod.metadata
            })
            if(path == '/') {
                routes.push({
                    path: '/',
                    ...mod.metadata
                })
            }
        }
    }
    
    return routes;
}

export function getRoute(slug, lang) {
    return `${lang}/${slug}`
}

