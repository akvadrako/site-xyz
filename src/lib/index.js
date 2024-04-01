/**
 * Internal Library
 */

import {writable, readable, derived} from 'svelte/store'
import {page} from '$app/stores'

export {goto} from '$app/navigation'
export {createToast} from './toasts'
export {loadDoc} from './docs'
export {localRoute} from './metadata'
export {log} from './shared'

export const base = "https://walltowall.nl"

// return thumbnail image
export function small(src) {
    return `${base}/.netlify/images?url=${src}&w=200`
}

// store: current language
export const lang = readable('en', set => {
    page.subscribe(p => set(p.data.lang))
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
