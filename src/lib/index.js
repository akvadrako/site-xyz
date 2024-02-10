/**
 * Internal Library
 */

import {writable, readable, derived} from 'svelte/store'
import {page, session} from '$app/stores'

export {goto} from '$app/navigation'
export {createToast} from './toasts'

export const base = "https://walltowall.nl"

export const metadata = writable({
    title_en: 'title_en',
    title_nl: 'title_nl',
})

// return thumbnail image
export function small(src) {
    return `/.netlify/images?url=${src}&w=200`
}

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

import dayjs from 'dayjs'

export function formatDate(when) {
    return dayjs(when).format('YYYY-MM-DD')
}

export function assert(test, ...args) {
    console.assert(test, ...args)
}

export function log(...args) {
    console.log('LOG', ...args)
}

log.error = (msg, ...args) => {
    console.error('ERROR: ' + msg, ...args)
}
