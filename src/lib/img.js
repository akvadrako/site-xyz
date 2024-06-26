
import {base} from '$lib'

// return thumbnail image
export function small(src) {
    return resize(src, 200)
}

export function resize(src, width) {
    return `${base}/.netlify/images?url=${src}&w=${width}`
}

export function srcset(src) {
    return `
    ${resize(src, 200)}  200w,
    ${resize(src, 400)}  400w,
    ${resize(src, 800)}  800w,
    ${resize(src, 1200)} 1200w,
    ${resize(src, 2000)}`
}

