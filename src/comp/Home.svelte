<script>
import Gallery from '$comp/Gallery.svelte'
import Hero from '$comp/Hero.svelte'
import { page } from '$app/stores'
import {lang} from '$lib'

</script>

<Hero />

<h2 lang="en">About</h2>
<h2 lang="nl">About</h2>

<div class="md text-3xl my-10">
    {@html $page.data.doc.body}
</div>

<div class="md my-14">
    <a href="/{$lang}/about">
        <button class="reset px-4 py-2 bg-[#E08331] text-$theme-bg">
            Read more +
        </button>
    </a>
</div>

<Gallery />
