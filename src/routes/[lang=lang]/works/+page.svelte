<script>
import Gallery from '$comp/Gallery.svelte'
import { page } from '$app/stores'
import {lang} from '$lib'
</script>

<div class="sm:(mx-32)">
    <h2 class="text-3xl leading-none">Portfolio</h2>
    <Gallery />
</div>
