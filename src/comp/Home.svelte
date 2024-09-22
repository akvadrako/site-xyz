<script>
import Gallery from '$comp/Gallery.svelte'
import Hero from '$comp/Hero.svelte'
import { page } from '$app/stores'
import {lang} from '$lib'

</script>

<Hero />

<div class="sm:(mx-32)">
    <h2 lang="en" class="my-4 text-xl leading-none">About</h2>
    <h2 lang="nl" class="my-4 text-xl leading-none">About</h2>

    <div class="md text-3xl my-4">
        {@html $page.data.doc.body}
    </div>

    <div class="my-4">
        <a href="/{$lang}/about" x-button class="px-4 py-2">
            Read more +
        </a>
    </div>

    <h2 class="text-3xl my-12 leading-none">Portfolio</h2>

    <Gallery max={6} />
    
    <div class="my-12">
        <a href="/{$lang}/works" x-button class="px-4 py-2">
            View all work
        </a>
    </div>
</div>
