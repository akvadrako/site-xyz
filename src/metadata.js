const modules = import.meta.globEager('/src/routes/**/*.md')
const posts = import.meta.globEager('/src/posts/**/*.md')

const routes = []

for (const file in [...modules, ...posts]) {
  if (Object.hasOwnProperty.call(modules, file)) {
    const module = modules[file]
    const path = file.replace('./routes/','/').replace('index','').replace('.md','')
    routes.push({
      path, ...module.metadata
    })
  }
}

export {routes}
