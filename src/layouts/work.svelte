<script>
    // mdsvex wrapper
    // can provide custom components and access front-matter
    
    import { Photo } from '$comp';
    import { lang, formatDate, small } from '$lib';
    import { loadWorks } from '$lib/metadata';
    import { prefetch } from '$app/navigation';

    export let title_en;
    export let title_nl;
    export let image;
    export let date;
    export let layout;
    export let slug;
    export let kind;
    export let _text;

    layout
    _text

    $: title = $lang == 'nl' ? title_nl : title_en;

    // prefetch images on hover
    function hover(work) {
        console.log('hover', work.image)
        prefetch(work.path)

        if(! work._cache) {
            work._cache = new Image()
            work._cache.onload = e => {
                console.log('preloaded image', e.target.src)
            }
            work._cache.src = small(work.image)
        }
    }

    let active = 0
    
    $: _works = loadWorks($lang)
    $: works = _works.map((w, i) => {
        w.active = w.slug == slug
        if(w.active) {
            active = i
        }
        return w
    })

    $: next = (active + 1) % works.length;
    $: prev = (active - 1 + works.length) % works.length

    $: console.log(works)
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
    <Photo src={image} />
</div>

<slot />

<p>Date: {formatDate(date)}</p>
<p>Kind: {kind}</p>

<nav aria-label="work navigation">
  <ul class="inline-flex -space-x-px">
    <li>
        <a href={works[prev].path}
            on:mouseover={() => hover(works[prev])}
            on:focus={() => hover(works[prev])}
            class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
    {#each works as work}
        <li>
            {#if work.active }
                <span
                    aria-current="page"
                    class="cursor-default py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{work.title}</span>
            {:else}
                <a
                    class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    on:mouseover={() => hover(work)}
                    on:focus={() => hover(work)}
                    href={work.path}
                >
                    {work.title}
                </a>
            {/if}
        </li>
    {/each}
    <li>
        <a href={works[next].path}
            on:mouseover={() => hover(works[next])}
            on:focus={() => hover(works[next])}
            class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>

