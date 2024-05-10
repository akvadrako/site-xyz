<script>
import Hero from '$comp/Hero.svelte'
import Photo from '$comp/Photo.svelte'
import { page } from '$app/stores'

let posts = $page.data.posts

</script>

<h2 class="uppercase text-2xl font-semibold sm:(border-b border-b-solid border-[var(--theme-text)])">Most Recent Posts</h2>

<div class="md">
    {@html $page.data.doc.body}
</div>

<section class="">
    {#each posts as post}
    <a class="block my-8" href={post.path}>
        <div class="h-32">
            <Photo
                src={post.image}
                alt="thumb"
                sizes="30vw"
                class="w-full object-[50%_0%] object-contain sm:(h-full w-auto)" 
            />
        </div>
        <h3 class="text-2xl font-semibold">{post.title}</h3>
    </a>
    {/each}
</section>

