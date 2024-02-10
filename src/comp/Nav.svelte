
<script>
import { page } from '$app/stores';
import { lang } from '$lib';
import { Search, Photo } from '$comp';
import Hero from '$comp/Hero.svelte';
import { beforeNavigate } from '$app/navigation';
import { range } from 'lodash-es';
import { onMount } from 'svelte';

export let routes

let sidebar
let open = false

beforeNavigate(() => {
    open = false;
    document.body.removeEventListener('click', handleDropdownOutsideClick, true);
})

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
        path: '/',
        label: { en: 'Works', nl: 'Works' },
    },
]

for(let n of navItems) {
    n.current = $page.url.pathname == `/${lang}/${n.path}`
}

$: calcNavItems = (() => {
    const nav = [ ...navItems ]

    for(let work of routes) {
        nav.push({
            path: work.bare_path,
            label: { en: work.title_en, nl: work.title_nl },
        })
    }

    return nav;
})()

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

onMount(() => {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            let ratio = entry.intersectionRatio

            console.log('io', ratio)

            if(ratio > 0.5) {
                // initial
                navRoot.style.backgroundColor = '#FFF'
                navRoot.style.color = '#3D3732'
            } else {
                // scrolled down
                navRoot.style.backgroundColor = '#3D3732'
                navRoot.style.color = '#F2EDE8'
                navRoot.style.opacity = 0.75
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: range(0, 1, 0.05),
    });
    observer.observe(sheet)
})
</script>

<div bind:this={sheet} class="sheet" />

<header>

    <nav bind:this={navRoot} class="px-8 flex gap-4">

        <a
            href="/{$lang}"
            class="uppercase flex-initial dark:text-white">
            <h1>Wall To Wall</h1>
        </a>

        <button class:open on:click={onClick}>
            <svg width=32 height=32>
                <line id="top" x1=0 y1=9    x2=32 y2=9    style="transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;"/>
                <line id="mid" x1=0 y1=18.5 x2=32 y2=18.5 style="transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;"/>
                <line id="bot" x1=0 y1=28    x2=32 y2=28  style="transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;"/>
            </svg>
        </button>

        <span class="flex-grow-[5]">
            &nbsp;
        </span>

        {#each navItems as item}
            <a
                href="/{$lang}{item.path}"
                class="link flex-initial max-w-xs block dark:text-white" 
                aria-current={ item.current ? "page" : '' }>
                {item.label[$lang]}
            </a>
        {/each}

        <Search />

        <span class="flex-initial">
            {#if $page.url.pathname == '/'}
                <b>EN</b> / <a sveltekit:noscroll href="/nl">NL</a>
            {:else if $lang == 'nl'}
                <a sveltekit:noscroll href="{$page.url.pathname.replace('/nl', '/en')}">EN</a> / <b>NL</b>
            {:else}
                <b>EN</b> / <a sveltekit:noscroll href="{$page.url.pathname.replace('/en', '/nl')}">NL</a>
            {/if}
        </span>
    </nav>

    <Hero />

    <ul bind:this={sidebar} id="sidebar" class:open class="flex">
        {#each calcNavItems as item}
        <li>
            <a href="/{$lang}{item.path}"
                class="block py-2 pr-4 pl-3 dark:text-white"
                aria-current="{ item.current ? 'page' : '' }"
            >
                {item.label[$lang]}
            </a>
        </li>
        {/each}
    </ul>
</header>
    
<style type="postcss">

header {
    --nav-height: 3rem;
}

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
    background-color: #3D3732;
    color: #3D3732;
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
    flex: 2 0 0%;
    text-align: center;
}
button svg {
    display: inline-block;
    _position: absolute;
    _left: 50%;
    _transform: translate(-50%, -50%);
}
button svg line {
    stroke: currentColor;
    stroke-width: 3;
}
.open #top {
    transform: translate(10px, 0px) rotate(45deg)
}
.open #mid {
    opacity: 0
}
.open #bot {
    transform: translate(-15px, 8px) rotate(-45deg)
}

#sidebar {
    display: block;
    transition: left 0.4s ease-in-out;
    position: fixed;
    top: 55px;
    bottom: 0;
    left: -20ch;
    z-index: 10;
    overflow-y: auto;
    width: 20ch;
    border-right: thin solid black;
    @apply bg-warm-gray-400; 
}

.link {
    display: none;
    text-transform: uppercase;
}

ul {
    display: flex;
    flex-direction: column;
}
ul a:hover {
    @apply bg-red-400;
}

#sidebar.open {
    left: 0px;
}


/* desktop */
@screen sm {
    .link {
        display: block;
    }
    button {
        display: none;
    }
}
</style>
