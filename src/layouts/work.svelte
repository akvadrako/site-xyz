<script>
    import {metadata as md_store} from '$lib'
    
    import { Photo, Thumbnail } from '$comp';
    import { lang, formatDate, small } from '$lib';
    import { loadWorks } from '$lib/metadata';
    import { prefetch, goto, disableScrollHandling, afterNavigate } from '$app/navigation';
    import { onMount } from 'svelte';

    export let title_en;
    export let title_nl;
    export let image;
    export let more_images = [];
    export let date;
    export let slug;
    export let kind;

    export let layout
    export let _text

    layout;
    _text;

    let frame

    onMount(() => {
        disableScrollHandling()
    })

    afterNavigate(({ from, to }) => {
        if(from && from.toString().includes('/works/'))
            return;

        window.scrollTo({
            top: frame.getBoundingClientRect().top + window.pageYOffset - 100,
        });
    })

    md_store.set({
        title_en: title_en,
        title_nl: title_nl,
    })

    function get_title(work) {
        return ($lang == 'nl' && work.title_nl) || work.title_en;
    }

    $: title = $lang == 'nl' ? title_nl : title_en;

    // prefetch images on hover
    function hover(work) {
        console.log('hover', work.image)
        prefetch(work.path)
    }

    function preloadImage(active, offset) {
        if(typeof Image === 'undefined')
            return;

        let idx = (active + offset + works.length) % works.length
        let work = works[idx]

        if(! work._cache) {
            work._cache = new Image()
            work._cache.onload = e => {
                //console.log('preload', e.target.src)
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

    $: preloadImage(active, -2)
    $: preloadImage(active, -1)
    $: preloadImage(active, 1)
    $: preloadImage(active, 2)

    $: next = works[(active + 1) % works.length];
    $: prev = works[(active - 1 + works.length) % works.length];

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
            goto(prev.path, { noscroll: true })
        } else {
            goto(next.path, { noscroll: true })
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

<div
    class="frame"
    bind:this={frame}
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
>
    <Photo src={subimage} />
</div>

<section class="blurb">
    <h2>{title}</h2>
    <slot />
    <p>date: {formatDate(date)}, category: {kind}</p>
</section>

{#if more_images.length > 0}
<div class="subs">
    {#each all_images as src}
        <a href='#src' on:click={() => setSub(src)}>
            <Thumbnail src={src} />
        </a>
    {/each}
</div>
{/if}

<nav>
    <a href={prev.path}
        sveltekit:noscroll
        on:mouseover={() => hover(prev)}
        on:focus={() => hover(prev)}
    >
        <figure>
            <x-title>Previous</x-title>
            <Thumbnail src={prev.image} />
            <figcaption>{get_title(prev)}</figcaption>
        </figure>
    </a>
    <div class="middle">
        <x-title>
        </x-title>
    </div>
    <a href={next.path}
        sveltekit:noscroll
        on:mouseover={() => hover(next)}
        on:focus={() => hover(next)}
    >
        <figure>
            <x-title>Next</x-title>
            <Thumbnail src={next.image} />
            <figcaption>{get_title(next)}</figcaption>
        </figure>
    </a>
</nav>

<style>
    figure {
        width: 100%;
    }

    figure :global(img) {
        height: 20vh;
        width: 100%;
        object-fit: contain;
    }
    x-title, figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        @apply py-2 px-8;
    }
    x-title {
        top: 0;
    }

    nav a {
        color: inherit;
    }

    .frame {
        height: 60vh;
        margin: 1em;
    }

    div :global(img) {
        object-fit: contain;
        object-position: center;
        width: 100%;
        height: 100%;
    }
    .frame > :global(div) {
        height: 60vh;
        width: 100%;
    }

    nav {
        /* break out of main */
        width: 100%;
        display: flex;
    }
    nav {
        margin: 10px 0 20px 0;
    }
    nav > * {
        text-align: center;
        position: relative;
        @apply cursor-default;
        flex-grow: 1;
        flex-basis: 20%;
    }
    nav > a:hover {
        @apply bg-gray-100 text-gray-700;
    }
    nav > *:first-child {
        text-align: left;
    }
    nav > *:last-child {
        text-align: right;
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
    }

    .subs a:hover {
        @apply bg-gray-100 text-gray-700;
    }
</style>
