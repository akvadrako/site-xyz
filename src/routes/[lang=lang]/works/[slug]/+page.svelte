<script>
import { Photo, Thumbnail } from '$comp';
import { lang, formatDate } from '$lib'; 
import { small } from '$lib/img';
import { preloadData, goto } from '$app/navigation';

export let data

$: more_images = data.doc.meta.more_images || []

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
        work._cache.src = small(work.image.path)
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
// $: console.debug('subimage', subimage)

///////////////////////////////////////////////////
// zoom

let zoom = false;
let frame
let canvas

function click_zoom(e) {
    let onPhone = window.matchMedia("(max-width: 639px)")

    if(onPhone.matches) {
        zoom = false;
    } else {
        zoom = !zoom;
        zoom_move(e)
    }
    console.log('zoom', zoom)
}

function zoom_move(e) {
    if(! zoom) {
        canvas.style["translate"] = ""
        return
    }

    let rect = frame.getBoundingClientRect()
    let xPos = e.clientX - (rect.x + rect.width / 2)
    let yPos = e.clientY - (rect.y + rect.height / 2)
    let trans = `${-xPos * 1.1}px ${-yPos * 1.1}px`

    canvas.style["translate"] = trans

    // console.log("move", e.clientX, rect.x, rect.width, xPos, trans)
    requestAnimationFrame(() => null)
}

///////////////////////////////////////////////////
// touch events

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

function setSub(img) {
    subimage = img;
}

$: all_images = [data.doc.image, ...more_images];
</script>

<section id="outer"
    class="mb-12 -mt-12"
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
>
    <a class="arrow" href={prev.path}
        data-sveltekit-noscroll
        on:mouseover={() => hover(prev)}
        on:focus={() => hover(prev)}
    >
        <svg width="100%" height="100%" viewBox="0 0 40.469 115.75">
            <polyline fill="none" stroke="#999999" stroke-width="5.6693" stroke-miterlimit="10" points="38.069,1.578 3.565,57.912
                38.069,114.245 "/>
        </svg>
    </a>

    <div bind:this={frame}
        class="frame"
        on:click={click_zoom}
        on:mousemove={zoom_move}
    >
        <div class="canvas" bind:this={canvas} class:zoom>
            <Photo
                src={subimage.path}
                width={subimage.width}
                height={subimage.height} 
                divcls="m-auto max-w-full max-h-[calc(100vh-96px)] bg-center bg-cover" />
        </div>
    </div>

    <a class="arrow" href={next.path}
        data-sveltekit-noscroll
        on:mouseover={() => hover(next)}
        on:focus={() => hover(next)}
    >
        <svg width="100%" height="100%" viewBox="0 0 40.469 115.75">
            <polyline fill="none" stroke="#999999" stroke-width="5.6693" stroke-miterlimit="10" points="2.565,1.578 37.07,57.912
                2.565,114.245 "/>
        </svg>
    </a>
</section>

<section class="desc my-4">
    <h2 class="font-medium text-2xl leading-none">{data.doc.title}</h2>
    {@html data.doc.body}
    <div class="flex py-2 border-0 border-t-2 border-solid border-[#e8dcd8]">
        <span>{formatDate(data.doc.date)}</span>
        <span class="text-right flex-grow">{data.doc.kind}</span>
    </div>

    {#if more_images.length > 0 }
        <div class="subs">
            {#each all_images as img}
                <button on:click={() => setSub(img)}>
                    <Thumbnail img={img} />
                </button>
            {/each}
        </div>
    {/if}
</section>

<style type="postcss">
:root {
    --arrow-width: 28px;
    --arrow-height: 80px;
}

#outer {
    position: relative;
}

.frame {
    margin: 0 var(--arrow-width);
}

/* laptop */

.canvas {
    transition: scale ease 0.3s;
    cursor: zoom-in;
    scale: 1;
}

.zoom {
    scale: 2;
    cursor: zoom-out;
}

.frame, .desc {
    margin: 0 calc(var(--arrow-width) * 2);
}

.arrow {
    width: var(--arrow-width);
    height: var(--arrow-height);
    position: absolute;
    top: calc(((100vw - 64px) * 0.6 - var(--arrow-height)) / 2);
    color: red;
    z-index: 2;
    right: 0;
    background: var(--sandstone);
}

.arrow:first-child {
    left: 0;
}

.arrow {
    opacity: 50%;
}

.subs {
    display: flex;
    margin: 8px 0;
    gap: 32px;
}

.subs button {
    border: none;
}

/* phone */

@media (max-width: 639px) {
    :root {
        --arrow-width: 24px;
        --arrow-height: 64px;
    }
    .canvas {
        cursor: auto;
    }
    .frame, .desc {
        margin: 0;
    }
    .subs {
        justify-content: space-between;
        gap: 8px;
    }
}

.arrow:hover {
    opacity: 100%;
}

.subs button {
    display: block;
    max-width: 40vw;
    height: 20vh;
    padding: 0;
    background: transparent;
    cursor: pointer;
    /*  filter: grayscale(100%); */
}

.subs button:hover {
    filter: grayscale(0);
}
</style>
