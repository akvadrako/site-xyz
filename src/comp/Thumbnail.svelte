<!-- 
    minimal version of Photo
-->
<script>
    import {base} from '$lib'

    export let src
    export let sizes = "10vw"
    export let alt = "image"
</script>

<style>
</style>

<img
    srcset="
    {base}{src}?nf_resize=fit&w=100   100w,
    {base}{src}?nf_resize=fit&w=200   200w,
    {base}{src}?nf_resize=fit&w=400   400w,
    {src}
    "
    src="{src}"
    sizes="{sizes}"
    alt="{alt}"
/>

