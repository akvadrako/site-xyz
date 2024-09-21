<script>
import Gallery from '$comp/Gallery.svelte'
import Hero from '$comp/Hero.svelte'
import { page } from '$app/stores'
import {lang} from '$lib'

</script>

<Hero />

<div class="sm:(mx-32)">
    <h2 lang="en">About</h2>
    <h2 lang="nl">About</h2>

    <div class="md text-3xl my-10">
        {@html $page.data.doc.body}
    </div>

    <div class="my-14">
        <a href="/{$lang}/about" x-button class="px-4 py-2">
            Read more +
        </a>
    </div>

    <h2 class="text-3xl leading-none">Portfolio</h2>

    <Gallery max={6} />
    
    <div class="my-14">
        <a href="/{$lang}/works" x-button class="px-4 py-2">
            View all work
        </a>
    </div>
</div>
