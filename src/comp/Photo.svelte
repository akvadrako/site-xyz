<!-- 
    docs:
    - https://gist.github.com/cathyxz/f17d12c07d60bcef52591e64e5e684fb
    - without 'sizes', FF and Safari always pick largest image
    - srcset: 400w is intrinsic width in pixels
    - sizes: media-condition + width-of-element (px, em or vw)
    - nf_resize: "fit" or "smartcrop"

https://docs.netlify.com/image-cdn/overview/

related: https://github.com/matyunya/svelte-image
-->
<script>
import {base, small} from '$lib'

export let src
export let sizes = "100vw"
export let alt = "image"

let real
let loaded = false;

function url(width) {
    return `/.netlify/images?url=${url}&w=${width}`
}

$: if(real && real.complete) {
    loaded = true;
}

function onLoad(event) {
    loaded = true;
}
</script>
<style lang="postcss">
img {
    _width: 100%;
    _height: 100%;
    _object-fit: cover;
}
.preload {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
}
div {
    _height: 100%;
    position: relative;
}
.real {
    z-index: 2;
    position: relative;
    visibility: hidden;
}
.real.loaded {
    visibility: visible;
}
</style>

<div>
    <img 
        class="photo preload"
        src="{small(src)}"
        alt="{alt} thumbnail"
    />
    <img
        bind:this={real}
        on:load={onLoad}
        class:loaded
        class="photo real"
        srcset="
        {url(200)}  200w
        {url(400)}  400w
        {url(800)}  800w
        {url(1200)} 1200w
        {url(2000)}
        "
        src="{url(800)}"
        sizes="{sizes}"
        alt="{alt}"
    />
</div>

