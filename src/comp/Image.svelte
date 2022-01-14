<!-- 
    docs:
    - https://gist.github.com/cathyxz/f17d12c07d60bcef52591e64e5e684fb
    - without 'sizes', FF and Safari always pick largest image
    - srcset: 400w is intrinsic width in pixels
    - sizes: media-condition + width-of-element (px, em or vw)
    - nf_resize: "fit" or "smartcrop"
-->
<script>
    import {base} from '$lib'

    export let src
    export let sizes = "100vw"
    export let alt = "image"
</script>
<style>
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>

<img srcset="
    {base}{src}?nf_resize=fit&w=400   400w,
    {base}{src}?nf_resize=fit&w=800   800w,
    {base}{src}?nf_resize=fit&w=1200 1200w,
    {src}
    "
    src="{src}"
    sizes="{sizes}"
    alt="{alt}"
/>

