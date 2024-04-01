<!-- 
    minimal version of Photo
-->
<script>
    import {resize} from '$lib'

    export let src
    export let sizes = "10vw"
    export let alt = "image"
</script>

<style lang="postcss">
</style>

<img
    class="w-full h-full object-contain photo block"
    srcset="
        {resize(src, 100)}  100w
        {resize(src, 200)}  200w
        {resize(src, 400)}  400w
        {resize(src, 800)}
    "
    src="{resize(src, 800)}"
    sizes="{sizes}"
    alt="{alt}"
/>

