/**
 * Server-side image manipulations.
 */

import sharp from 'sharp'

if (!import.meta.env.SSR) {
    console.error('IMPORTING SSR on client')
}

export async function readImage(path) {
    if(! path)
        return null;

    // Sharp is the default image service used for astro:assets
    const image = sharp("static/" + path, {
        sequentialRead: false,
    });

    // should be fast - https://sharp.pixelplumbing.com/api-input
    let meta = await image.metadata();
    // console.info(path, meta)
    return {
        path,
        width: meta.width,
        height: meta.height,
    }
}

