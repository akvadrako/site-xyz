<script>
import { browser } from "$app/environment";
import { createToast } from '$lib';
import Notify from '$comp/Notify.svelte';
import Nav from '$comp/Nav.svelte';
import Footer from '$comp/Footer.svelte';

// CSS Imports
import '/src/style.css'
import 'virtual:uno.css'  // utilities: top priority

export let data

$: ititle = data.title

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
    <meta http-equiv="content-language" content="{data.lang}" />
    <!-- help dark reader detect dark mode support -->
    <meta name="color-scheme" content="light dark">
    <link rel="icon" href="/media/favicon.svg">
</svelte:head>

<Nav />
<Notify />

<main bind:this={main} lang={data.lang} class="px-8 mt-[calc(var(--nav-height)*2)]">
    <slot />
</main>

<Footer />

