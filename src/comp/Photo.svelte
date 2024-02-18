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
export let divcls = "photo h-full"

let imgcls = ""
export { imgcls as class }

let real
let loaded = false;

function url(width) {
    return `${base}/.netlify/images?url=${src}&w=${width}`
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
    display: block;
}
.preload {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
}
div {
    position: relative;
}
.real {
    visibility: hidden;
}
.loaded .real {
    visibility: visible;
}
.loaded .preload {
    display: none;
}
</style>

<div class={divcls} class:loaded>
    <img 
        class="photo preload {imgcls}"
        src="{small(src)}"
        alt="{alt} thumbnail"
    />
    <img
        bind:this={real}
        on:load={onLoad}
        class="photo real {imgcls}"
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

