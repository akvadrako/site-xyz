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
    import Notify from '$comp/Notify.svelte';
    import Nav from '$comp/Nav.svelte';
    import Footer from '$comp/Footer.svelte';
    
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

<Footer />

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    main > :global(*) {
    /* width: min(calc(100vw - 8px), 1000px); */
        width: min(100%, 1000px);
    }
</style>

