
import {readable} from 'svelte/store'
import {page, session} from '$app/stores'

const lang = readable('en', set => {
    page.subscribe(value => {
        if (value.path.startsWith('/nl')) {
            set('nl')
        } else {
            set('en')
        }
    })
})

export {lang}
