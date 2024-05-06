<script>
import Hero from '$comp/Hero.svelte'
import Photo from '$comp/Photo.svelte'
import { page } from '$app/stores'

let posts = $page.data.posts

</script>
<Hero />

<h2>Blog</h2>

<div class="md text-3xl my-10">
    {@html $page.data.doc.body}
</div>

<section class="my-8">
    {#each posts as post}
    <div class="flex">
        <div>
            <span class="case-upper">{post.title}</span>
        </div>
        <a class="flex-1" href={post.path}>
            <Photo
                src={post.image}
                alt="thumb"
                sizes="30vw"
                class="h-full w-full object-[50%_0%]" 
            />
        </a>
    </div>
    {/each}
</section>

