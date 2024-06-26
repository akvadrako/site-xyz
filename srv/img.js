/**
 * Server-side image manipulations.
 */

import * as id from 'image-dimensions';
import fs from 'fs'
import sharp from 'sharp'

if (!import.meta.env.SSR) {
    console.error('IMPORTING SSR on client')
}

export async function read_image(path) {
    if(! path)
        return null;

    let data = fs.createReadStream("static/" + path)
    let size = await id.imageDimensionsFromStream(data)

    return {
        path: path,
        ...size,
    }
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

export function readImageSync(path) {
    let buf = Buffer.alloc(100000);
    let fd = fs.openSync("static/" + path, 'r')
    
    fs.readSync(fd, buf, 0, 100000, 0)
    fs.closeSync(fd)

    // bytes = new Uint8Array(bytes);
    let out = id.imageDimensionsFromData(buf)

    console.log('out', path, out)
    return out
}

