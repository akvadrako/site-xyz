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
        <a href="/{$lang}/about">
            <button class="reset px-4 py-2 bg-[#E08331] text-$theme-bg">
                Read more +
            </button>
        </a>
    </div>

    <h2 class="text-3xl leading-none">Portfolio</h2>

    <Gallery max={6} />
    
    <div class="my-14">
        <a href="/{$lang}/works">
            <button class="reset px-4 py-2 bg-[#E08331] text-$theme-bg">
                View all work
            </button>
        </a>
    </div>
</div>
