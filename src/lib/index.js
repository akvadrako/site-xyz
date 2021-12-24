/**
 * Internal Library
 */

import {readable} from 'svelte/store'
import {page, session} from '$app/stores'

export const lang = readable('en', set => {
    page.subscribe(value => {
        if (value.path.startsWith('/nl')) {
            set('nl')
        } else {
            set('en')
        }
    })
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
