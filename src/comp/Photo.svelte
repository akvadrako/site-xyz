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
export let width = null
export let height = null
export let sizes = "100vw"
export let alt = "image"
export let divcls = "photo h-full"

    /*
import { onDestroy } from 'svelte';

onDestroy(() => {
        console.log('the component is being destroyed');
});
     */

let imgcls = ""

export { imgcls as class }

let real
let loaded

$: ratio = width && height ? width / height : "auto"

$: bgimg = resize(src, 200)

// reset when src changes
$: if(src) {
    loaded = false
    console.log("new", src, width, height)
}

$: if(real && real.complete) {
    console.log("loaded", "now")
    loaded = true;
}

$: srcset = `
    ${resize(src, 200)}  200w,
    ${resize(src, 400)}  400w,
    ${resize(src, 800)}  800w,
    ${resize(src, 1200)} 1200w,
    ${resize(src, 2000)}
`

function onLoad(event) {
    let old = !event.target.currentSrc.includes(src)
    console.log("loaded", event.target.currentSrc, "old=", old)
    
    if(! old)
        loaded = true;
}
</script>
<style lang="postcss">
img {
    display: block;
}
div {
    position: relative;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
.real {
    opacity: 0;
    transition: opacity 0s;
}
.loaded .real {
    transition: opacity 200ms;
    opacity: 1;
}
</style>

<div class={divcls}
    style:background-image="url({bgimg})"
    style:aspect-ratio={ratio}
    class:loaded>
    <img
        bind:this={real}
        on:load={onLoad}
        class="photo real {imgcls}"
        srcset={srcset}
        src="{resize(src, 200)}"
        sizes="{sizes}"
        alt="{alt}"
        width={width}
        height={height}
    />
</div>

