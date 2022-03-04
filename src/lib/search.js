/**
 * Search functionality
 */

import MiniSearch from 'minisearch'
        
const data_href = '/data/search_index.json'

let idx = null
let _idx = null

async function _loader() {
    console.log('loading', data_href)
    const res = await fetch(data_href)
    const data = await res.json()
    
    return MiniSearch.loadJS(data.index, data.config)
}

async function load_index() {
    if(_idx === null) {
        _idx = _loader()
    }
    
    idx = await _idx
}

// [{"suggestion":"about","terms":["about"],"score":25.725098449559425}]
export async function suggest(query) {
    await load_index()

    return idx.autoSuggest(query, { fuzzy: 0.2 })
}

export async function search(query) {
    await load_index()

    return idx.search(query, {
        prefix: true,
        boost: { title_en: 2, path: 2 },
        fuzzy: 0.2,
    })
}
