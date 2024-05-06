<script>
import { Photo, Thumbnail } from '$comp';
import { lang, formatDate, small } from '$lib';
import { preloadData, goto } from '$app/navigation';

export let data

$: more_images = data.doc.meta.more_images || []

function get_title(work) {
    return ($lang == 'nl' && work.title_nl) || work.title_en;
}

// prefetch images on hover
function hover(work) {
    preloadData(work.path)
}

function preloadImage(active, offset) {
    if(typeof Image === 'undefined')
        return;

    let idx = (active + offset + works.length) % works.length
    let work = data.works[idx]

    if(! work._cache) {
        work._cache = new Image()
        work._cache.onload = e => {
            //console.log('preload', e.target.src)
        }
        work._cache.src = small(work.image)
    }
}

let active = 0

$: works = data.works.map((w, i) => {
    w.active = w.slug == data.doc.slug
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

$: subimage = data.doc.image;

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

$: all_images = [data.doc.image, ...more_images];
</script>

<section id="outer"
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
>
    <a class="arrow" href={prev.path}
        data-sveltekit-noscroll
        on:mouseover={() => hover(prev)}
        on:focus={() => hover(prev)}
    >
        <svg width="28px" height="80px" viewBox="0 0 40.469 115.75">
            <polyline fill="none" stroke="#999999" stroke-width="5.6693" stroke-miterlimit="10" points="38.069,1.578 3.565,57.912
                38.069,114.245 "/>
        </svg>
    </a>

    <a class="frame"
        href={subimage}
    >
        <Photo src={subimage} />
    </a>

    <a class="arrow" href={next.path}
        data-sveltekit-noscroll
        on:mouseover={() => hover(next)}
        on:focus={() => hover(next)}
    >
        <svg width="28px" height="80px" viewBox="0 0 40.469 115.75">
            <polyline fill="none" stroke="#999999" stroke-width="5.6693" stroke-miterlimit="10" points="2.565,1.578 37.07,57.912
                2.565,114.245 "/>
        </svg>
    </a>
</section>

    <section class="my-4">
        <h2 class="font-bold text-xl">{data.doc.title}</h2>
        {@html data.doc.body}
        <div class="flex py-2 border-0 border-t-2 border-solid border-[#e8dcd8]">
            <span>{formatDate(data.doc.date)}</span>
            <span class="text-right flex-grow">{data.doc.kind}</span>
        </div>
    </section>

    {#if more_images.length > 0 }
        <div class="subs">
            {#each all_images as src}
                <button on:click={() => setSub(src)}>
                    <Thumbnail src={src} />
                </button>
            {/each}
        </div>
    {/if}

<style type="postcss">
:root {
    --arrow-width: 28px;
}

#outer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: min(40vw, 50vh);
}

#middle {
    margin: 0 calc(var(--arrow-width) * 2);
}

.arrow {
    flex-grow: 0;
    opacity: 20%;
    width: var(--arrow-width);
}

.arrow:hover {
    opacity: 100%;
}

.frame {
    height: 100%;
    flex-grow: 1;
    margin: 0 var(--arrow-width);
}

.frame :global(img) {
    object-fit: contain;
    object-position: center;
    width: 100%;
    height: 100%;
}
.frame > :global(div) {
    height: 100%;
    width: 100%;
}

.subs {
    display: flex;
    gap: 8px;
    margin: 8px 0;
}

.subs button {
    display: block;
    max-width: 40vw;
    height: 20vh;
    padding: 0;
    background: white;
    cursor: pointer;
    filter: grayscale(100%);
}

.subs button:hover {
    filter: grayscale(0);
}
</style>
