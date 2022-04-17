<script context="module">
    import {pages} from '$lib'
    import {get} from 'svelte/store'

    const data_href = '/data/pages.json'

    export async function load({fetch, params}) {
        if(get(pages).length === 0) {
            console.log('load pages')
            const resp = await fetch(data_href)
            pages.set((await resp.json()).routes)
        }

        return {}
    }
</script>

<script>
    import { browser } from "$app/env";
    import { lang, metadata, createToast } from '$lib';
    import Notify from '$comp/Notify';
    import Nav from '$comp/Nav';
    
    import 'virtual:windi.css'
    import '/src/global.css'
    import '/src/fonts.css'

    $: ititle = {en: $metadata.title_en, nl: $metadata.title_nl}[$lang];

    function unhandledrejection(event) {
        createToast({ msg: `Unhandled Promise: ${event.reason}` })
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent
    function onerror(event) {
        let msg = event.message || 'unknown';
        createToast({ msg: `Error: ${msg}` })
    }

import { afterNavigate } from '$app/navigation';

var main

afterNavigate(({ from }) => {
    console.log('afterNav', { from })

    // noscroll or targeted element 
    if(window.scrollY != 0)
        return;

    // initial page load
    if(! from)
        return;

    /*
    see client.js
    const deep_linked = to.hash && document.getElementById(to.hash.slice(1));
    if (deep_linked) {
        deep_linked.scrollIntoView();
    const scroll = scroll_positions[current_history_index];
	if (scroll) scrollTo(scroll.x, scroll.y);
    if (scroll) {
        scrollTo(scroll.x, scroll.y);
        return;
    }

    window.scrollY = main.getBoundingClientRect().top + window.pageYOffset - 100
    */

    window.scrollTo({
        top: main.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: 'instant',
    });
})
</script>

<svelte:window
    on:unhandledrejection={unhandledrejection}
    on:error|capture={onerror}
/>

<svelte:head>
    <title>Wall To Wall || {ititle}</title>
    <meta http-equiv="content-language" content="{$lang}" />
</svelte:head>

<Nav />
<Notify />

<main bind:this={main} lang={$lang}>
<slot />
</main>

<footer class="bg-white my-4 dark:border-white-500 border-black-500 border-t-2 border-solid clear-both`">
    <div class="py-12 md:flex md:justify-between">
        <div class="mt-8 md:mt-0 text-base text-gray-400">
                2611 KR Delft
        </div>
        <div class="mt-8 md:mt-0 text-center text-base text-gray-400">
                1013 LC Amsterdam
        </div>
        <div class="space-x-6 text-right">
            <a class="text-gray-400 hover:text-gray-500" href="https://www.facebook.com/Wall-to-Wall-103953875589378" rel="external">
                <span class="sr-only">Facebook</span>
                <svg id="facebook" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"

                >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
            </a>

            <a class="text-gray-400 hover:text-gray-500" href="https://www.instagram.com/petit.nuit/" rel="external">
                <svg id="instagram" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"

                >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            </a>

            <!--
            <a href="https://twitter.com/walltowall" rel="external" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Twitter</span>
                <svg id="twitter"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                ><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            -->
        </div>
    </div>
</footer>

<style>
    svg {
        display: inline-block;
    }
    footer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    footer a {
        height: 40px;
        width: 40px;
        opacity: 50%;
    }
    footer a:hover {
        opacity: 100%;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    main > :global(*), footer > div {
    /* width: min(calc(100vw - 8px), 1000px); */
        width: min(100%, 1000px);
    }
    svg {
        height: 1.5em;
    }
</style>

