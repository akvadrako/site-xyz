const pages_mds = import.meta.globEager('/src/routes/**/*.md')
const pages = [] //import.meta.globEager('/src/routes/**/*.svelte')

const modules = {...pages_mds, ...pages}

function loadRoutes() {
    const routes = []
   
    for (const file in modules) {
        if (Object.hasOwnProperty.call(modules, file)) {
            const mod = modules[file]
            const path = file.replace('/src/routes/','/').replace('index','').replace('.md','')
            routes.push({
                path, ...mod.metadata
            })
        }
    }
    
    return routes;
}

export {loadRoutes}
