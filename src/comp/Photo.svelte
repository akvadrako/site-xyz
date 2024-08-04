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

import {resize, srcset} from '$lib/img'

export let src
export let width = null
export let height = null
export let sizes = "100vw"
export let alt = "image"
export let divcls = "photo max-h-full max-w-full bg-center bg-contain"

// override width / height on img tag
let imgcls = "h-full w-full object-cover"

export { imgcls as class }

let real
let loaded

$: ratio = width && height ? width / height : "auto"

$: bgimg = resize(src, 200)

// reset when src changes
$: if(src) {
    loaded = false
    // console.debug("new photo", src, width, height)
}

$: if(real && real.complete) {
    console.log("loaded", "now")
    loaded = true;
}

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
    background-repeat: no-repeat;
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
    class:loaded
    style:background-image="url({bgimg})"
    style:aspect-ratio={ratio}
>
    <img
        bind:this={real}
        on:load={onLoad}
        class="photo real {imgcls}"
        srcset={srcset(src)}
        src="{resize(src, 200)}"
        sizes="{sizes}"
        alt="{alt}"
        width={width}
        height={height}
    />
</div>

