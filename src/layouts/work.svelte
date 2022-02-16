<script>
    // mdsvex wrapper
    // can provide custom components and access front-matter
    
    import { Photo } from '$comp';
    import { lang, formatDate, small } from '$lib';
    import { loadWorks } from '$lib/metadata';
    import { prefetch, goto } from '$app/navigation';

    export let title_en;
    export let title_nl;
    export let image;
    export let more_images = [];
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
    $: prev = (active - 1 + works.length) % works.length;

    $: subimage = image;

    var xDown = null;
    var yDown = null;
    var xDiff = null;
    var yDiff = null;
    var timeDown = null;
    var startEl = null;

    function handleTouchEnd(e) {

        if (startEl !== e.target)
            return;
        
        if(Date.now() - timeDown > 500)
            return;
        
        if (Math.abs(xDiff) < Math.abs(yDiff))
            return;
        
        if (Math.abs(xDiff) < 40)
            return;

        // var changedTouches = e.changedTouches || e.touches || [];
        // touchendX = e.changedTouches[0].clientX

        if (xDiff < 0) {
            goto(works[prev].path, { noscroll: true })
        } else {
            goto(works[next].path, { noscroll: true })
        }
    }

    function handleTouchStart(e) {
        startEl = e.target;
        timeDown = Date.now();
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
    }

    function handleTouchMove(e) {
        xDiff = xDown - e.touches[0].clientX;
        yDiff = yDown - e.touches[0].clientY;
    }

    function setSub(path) {
        subimage = path;
    }

    $: all_images = [image, ...more_images];
</script>
<style>
    .frame {
        height: 60vh;
        margin: 1em;
    }
    .inner {
        overflow-x: auto;
    }

    div :global(img) {
        object-fit: contain;
        object-position: left;
    }
    nav {
        margin-top: 1em;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        @apply border border-gray-300 rounded-lg;
    }
    nav > * {
        text-align: center;
        @apply cursor-default;
        flex-grow: 1;
        flex-basis: 20%;
        @apply py-2 px-3 ml-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
    }

    nav > *:first-child {
        text-align: left;
    }
    nav > *:last-child {
        text-align: right;
    }
    nav {
        display: flex;
        width: 100%;
        margin: 0 0 1em 0;
    }
    .subs {
        display: flex;
        gap: 10px;
        margin: 1em 0;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        @apply border border-gray-300 rounded-lg;
    }
    .subs a {
        width: 100px;
        height: 100px;
        cursor: pointer;
        padding: 10px;
        @apply hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
    }
</style>

<nav>
    <a href={works[prev].path}
        on:mouseover={() => hover(works[prev])}
        on:focus={() => hover(works[prev])}
    >
        Prev: {works[prev].title}
    </a>
    <span>
        {title}
    </span>
    <a href={works[next].path}
        on:mouseover={() => hover(works[next])}
        on:focus={() => hover(works[next])}
    >
        Next: {works[next].title}
    </a>
</nav>

<div
    class="frame"
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
>
    <Photo src={subimage} />
</div>

{#if more_images.length > 0}
<div class="subs">
    {#each all_images as src}
        <a on:click={() => setSub(src)}>
            <Photo src={src} />
        </a>
    {/each}
</div>
{/if}

<slot />

<p>Date: {formatDate(date)}</p>
<p>Kind: {kind}</p>
