/**
 * Internal Library
 */

import {readable, derived} from 'svelte/store'
import {page, session} from '$app/stores'

export {goto} from '$app/navigation'

// store: current language
export const lang = readable('en', set => {
    page.subscribe(value => {
        if(! page) {
            console.error('$lang: missing $page')
        }

        if (value.url.pathname.startsWith('/nl')) {
            set('nl')
        } else {
            set('en')
        }
    })
})

// store: localized route for path + params
export const route = derived(lang, $lang => {
    return (path, params) => {
        if(params) {
            path += '?' + (new URLSearchParams(params)).toString()
        }

        return '/' + $lang + path
    }
})

export function assert(test, ...args) {
    console.assert(test, ...args)
}

export function log(...args) {
    console.log(...args)
}

log.error = (msg, ...args) => {
    console.error('ERROR: ' + msg, ...args)
}
