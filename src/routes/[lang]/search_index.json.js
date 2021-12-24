
import {getRoutes} from '/src/metadata'
import {log} from '$lib'
import lunr from 'lunr'

export async function get({ params }) {
    log('loading search.json')

    // set global lunr for below packages
    this.lunr = lunr
    
    await import('lunr-languages/lunr.stemmer.support')
    await import('lunr-languages/lunr.multi')
    await import('lunr-languages/lunr.nl')

    // FIXME - handle nl
    const routes = getRoutes('en')

    var idx = lunr(function () {
        this.use(lunr.multiLanguage('en', 'nl'))
        this.ref('path')
        this.field('text')
        this.field('path')
        this.field('title')
         
        this.metadataWhitelist = ['position']

        routes.forEach(function (doc) {
            this.add(doc)
        }, this)
    })

    return {
        body: {
            routes: routes,
            index: idx.toJSON(),
        }
    }
}

