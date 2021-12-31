
import {writable} from 'svelte/store'

export const toasts = writable([])
  
export let themes = {
    danger: '#bb2124',
    success: '#22bb33',
    warning: '#f0ad4e',
    info: '#5bc0de',
    default: '#aaaaaa'
}

export function createToast ({ msg, type, persist=false, timeout=3000 }) {

    const background = themes[type] || themes.default
    const id = Math.random().toString(36).replace(/[^a-z]+/g, '')

    try {
        sessionStorage.setItem(
            sessionKey,
            JSON.stringify([
                ...JSON.parse(sessionStorage.getItem(sessionKey) || '[]'),
                { ...detail, id }
            ])
        )
    } catch (e) {}

    const toast = {
        id,
        msg,
        background,
        persist,
        timeout: persist ? 0 : timeout,
        width: '100%'
    }
  
    toast.purge = () => {
        console.log('toast-purge', toast)
        toasts.update(ts => ts.filter(t => t.id != id))
    }

    console.log('toast-add', toast)
    toasts.update(ts => [ toast, ...ts ])
}
