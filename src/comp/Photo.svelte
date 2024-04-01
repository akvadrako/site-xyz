<script>
/** 
docs:
- https://gist.github.com/cathyxz/f17d12c07d60bcef52591e64e5e684fb
- without 'sizes', FF and Safari always pick largest image
- srcset: 400w is intrinsic width in pixels
- sizes: media-condition + width-of-element (px, em or vw)
- https://docs.netlify.com/image-cdn/overview/
- related: https://github.com/matyunya/svelte-image
*/

import {resize} from '$lib'

export let src
export let sizes = "100vw"
export let alt = "image"
export let divcls = "photo h-full"

let imgcls = ""
export { imgcls as class }

let real
let loaded = false;

$: if(real && real.complete) {
    loaded = true;
    console.log("loaded already")
}

function onLoad(event) {
    loaded = true;
    console.log("loaded")
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
    transition: opacity 1000ms, display 1000ms;
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
    opacity: 0;
}
</style>

<div class={divcls} class:loaded>
    <img 
        class="photo preload {imgcls}"
        src="{resize(src, 200)}"
        alt="{alt} thumbnail"
    />
    <img
        bind:this={real}
        on:load={onLoad}
        class="photo real {imgcls}"
        srcset="
        {resize(src, 200)}  200w
        {resize(src, 400)}  400w
        {resize(src, 800)}  800w
        {resize(src, 1200)} 1200w
        {resize(src, 2000)}
        "
        src="{resize(src, 800)}"
        sizes="{sizes}"
        alt="{alt}"
    />
</div>

