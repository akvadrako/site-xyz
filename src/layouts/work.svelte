<script>
    // mdsvex wrapper
    // can provide custom components and access front-matter
    
    import { Image } from '$comp';
    import { lang, formatDate } from '$lib';
    import { loadWorks } from '$lib/metadata';

    export let title_en;
    export let title_nl;
    export let image;
    export let date;
    export let layout;
    export let slug;
    export let _text;

    layout
    _text

    $: title = $lang == 'nl' ? title_nl : title_en;
</script>
<style>
    div {
        /* border: thick solid black; */
        height: 60vh;
    }
    div :global(img) {
        object-fit: contain;
    }
    nav {
        padding: 20px 0;
    }
</style>

<h2>{title} ({$lang})</h2>

<div>
    <Image src={image} />
</div>

<slot />

<p>Date: {formatDate(date)} Slug: {slug}</p>

<nav aria-label="work navigation">
  <ul class="inline-flex -space-x-px">
    <li>
      <a  class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
    {#each loadWorks($lang) as work}
        <li>
            {#if work.slug == slug }
                <a aria-current="page" class="cursor-default py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{work.title}</a>
            {:else}
                <a class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                href={work.path}>
                    {work.title}
                </a>
            {/if}
        </li>
    {/each}
    <li>
      <a  class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>

