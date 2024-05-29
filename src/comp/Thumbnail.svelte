<!-- 
    minimal version of Photo
-->
<script>
import {resize} from '$lib'

export let img
export let sizes = "10vw"
export let alt = "image"

$: src = img.path

$: srcset =  `
    ${resize(src, 100)}  100w,
    ${resize(src, 200)}  200w,
    ${resize(src, 400)}  400w,
    ${resize(src, 800)}
`
</script>

<style lang="postcss">
</style>

<img
    width={img.width}
    height={img.height}
    class="w-full h-full object-contain photo block"
    srcset={srcset}
    src={resize(src, 200)}
    sizes={sizes}
    alt={alt}
/>

