/**
 * Internal Library
 */

import {writable, readable, derived} from 'svelte/store'
import {page} from '$app/stores'

export {goto} from '$app/navigation'
export {createToast} from './toasts'
export {log, assert} from './shared'
export {base} from './const'
export {formatDate} from './date'

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

