

import * as id from 'image-dimensions';

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

