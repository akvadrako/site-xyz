
<script>
import { page } from '$app/stores';
import { lang } from '$lib';
import { Search, Photo } from '$comp';
import { beforeNavigate } from '$app/navigation';
import { onMount } from 'svelte';

let sidebar
let open = false

beforeNavigate(() => {
    open = false;
    document.body.removeEventListener('click', handleDropdownOutsideClick, true);
})

const homeItem = { 
    path: '/works',
    label: { en: 'Home', nl: 'Start' },
}

const navItems = [
    { 
        path: '/about',
        label: { en: 'About', nl: 'Over' },
    },
    { 
        path: '/contact',
        label: { en: 'Contact', nl: 'Contact' },
    },
    { 
        path: '/works',
        label: { en: 'Works', nl: 'Works' },
    },
]

for(let n of navItems) {
    n.current = $page.url.pathname == `/${lang}/${n.path}`
}

function handleDropdownOutsideClick(event) {
    if (! sidebar)
        return;

    if (event.target == sidebar || sidebar.contains(event.target))
        return;

    console.log('outside', event)
    event.preventDefault()
    event.stopPropagation()
    open = false
    document.body.removeEventListener('click', handleDropdownOutsideClick, true);
}

function onClick(event) {
    event.preventDefault()
    console.log('button', { open, event })
    open = !open;
    if(open) {
        document.body.addEventListener('click', handleDropdownOutsideClick, true)
    }
}


let navRoot
let sheet
let scrolled = false

onMount(() => {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            let ratio = entry.intersectionRatio

            if(! navRoot)
                return;

            if(ratio > 0.5) {
                scrolled = false
            } else {
                scrolled = true
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: Array.from({length: 20}, (_, i) => i * 0.05),
    });
    observer.observe(sheet)
})
</script>

<div bind:this={sheet} class="sheet" />

<header class:scrolled class:open>

    <nav bind:this={navRoot} class="px-8 flex gap-4">

        <a
            href="/{$lang}{homeItem.path}"
            class="uppercase flex-initial dark:text-white"
            title="{homeItem.label[$lang]}"
        >
            <h1>Wall To Wall</h1>
        </a>
        <span class="flex-grow-[5]">
            &nbsp;
        </span>

        {#each navItems as item}
            <a
                href="/{$lang}{item.path}"
                class="link lt-sm:hidden flex-initial max-w-xs uppercase dark:text-white" 
                aria-current={ item.current ? "page" : false }>
                {item.label[$lang]}
            </a>
        {/each}

        <div class="lt-sm:hidden">
                <Search />
        </div>

        <span class="lang-switcher flex-initial">
            {#if $page.url.pathname == '/'}
                <b>EN</b> / <a data-sveltekit-noscroll href="/nl">NL</a>
            {:else if $lang == 'nl'}
                <a data-sveltekit-noscroll href="{$page.url.pathname.replace('/nl', '/en')}">EN</a> / <b>NL</b>
            {:else}
                <b>EN</b> / <a data-sveltekit-noscroll href="{$page.url.pathname.replace('/en', '/nl')}">NL</a>
            {/if}
        </span>

        <button class="reset sm:hidden" on:click={onClick}>
            <svg width=32 height=32>
                <line id="top" x1=0 y1=9    x2=32 y2=9    style="transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;"/>
                <line id="mid" x1=0 y1=18.5 x2=32 y2=18.5 style="transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;"/>
                <line id="bot" x1=0 y1=28    x2=32 y2=28  style="transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;"/>
            </svg>
        </button>

    </nav>

    <div bind:this={sidebar} id="sidebar" class="px-4">

        <div class="my-4">
            <Search initialOpen={true} />
        </div>

        {#each navItems as item}
            <a
                href="/{$lang}{item.path}"
                class="block leading-none my-4" 
                aria-current={ item.current ? "page" : false }>
                {item.label[$lang]}
            </a>
        {/each}
    </div>
</header>
    
<style lang="postcss">

nav {
    height: var(--nav-height);
    justify-content: left;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    white-space: nowrap;
    transition: background-color 0.5s, color 0.5s;
}

/* scrolled to top */
nav, #sidebar {
    background-color: #FFF;
    color: #3D3732;
}
@media screen and (prefers-color-scheme: dark) {
    nav, #sidebar {
        background-color: #F2EDE8;
    }
}

/* scrolled down */
.scrolled #sidebar {
    background-color: #3D3732;
    color: #F2EDE8;
}
.scrolled nav {
    background-color: #3D3732;
    color: #F2EDE8;
    opacity: 75%;
}
@media (max-width: 639px) {
    .scrolled h1, .scrolled .lang-switcher {
        display: none; 
    }
}

.sheet {
    position: absolute;
    height: 200px;
    width: 100%;
    top: 0;
    z-index: -100;
}

nav h1 {
    font-size: inherit;
}
nav > * {
    text-align: center;
}

/**********************
 * mobile
 */
button {
    cursor: pointer;
    transition: color 0.4s ease-in-out;
    text-align: center;
}
button svg {
    display: inline-block;
}
svg line {
    stroke: currentColor;
    stroke-width: 3;
}
.open svg #top {
    transform: translate(10px, 0px) rotate(45deg)
}
.open svg #mid {
    opacity: 0
}
.open svg #bot {
    transform: translate(-15px, 8px) rotate(-45deg)
}

#sidebar {
    transition: left 0.4s ease-in-out;
    position: fixed;
    top: var(--nav-height);
    bottom: 0;
    left: -20ch;
    z-index: 10;
    overflow-y: auto;
    width: 20ch;
    border-right: thin solid black;
    display: none;
}

.open #sidebar {
    left: 0px;
    display: block;
}

.open h1 {
    display: none;
}

</style>
