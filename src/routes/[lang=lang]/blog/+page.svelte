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
        <a class="block my-8 flex gap-4" href={post.path}>
            <div class="w-32 mt-2 flex-none">
                <Photo
                    src={post.image.path}
                    width={post.image.width}
                    height={post.image.height}
                    alt="thumb"
                    sizes="30vw"
                    divcls="ml-auto max-h-48 max-w-full"
                />
            </div>
            <div>
                <h3 class="text-2xl font-semibold">{post.title}</h3>
                <p>{post.preview}</p>
                <!-- ({post.date}) -->
            </div>
        </a>
    {/each}
</section>

