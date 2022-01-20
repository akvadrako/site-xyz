<script>
    import { page } from '$app/stores';
    import { browser } from "$app/env";
    import { lang, createToast } from '$lib';
    import { Link, Search } from '$comp';
    import Notify from '$comp/Notify';
    import Nav from '$comp/Nav';
    
    import 'virtual:windi.css'
    import '/src/global.css'
    
    if (browser)
        import("virtual:windi-devtools")

    export let title = ''

    function unhandledrejection(event) {
        createToast({ msg: `Unhandled Promise: ${event.reason}` })
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent
    function onerror(event) {
        let msg = event.message || 'unknown';
        createToast({ msg: `Error: ${msg}` })
    }
</script>

<svelte:window
    on:unhandledrejection={unhandledrejection}
    on:error|capture={onerror}
/>

<svelte:head>
    <title>Wall 2 Wall | {title} |</title>
    <meta http-equiv="content-language" content="{$lang}" />
</svelte:head>

<style>
    footer {
        @apply mx-3 p-3;
        @apply dark:border-white-500 border-black-500 border-t-2 border-solid;
        text-align: center;
        clear: both;
    }
    footer a {
        color: inherit;
    }
    footer a {
        @apply mx-4;
        height: 40px;
        width: 40px;
        opacity: 50%;
        display: inline-block;
    }
    footer a:hover {
        opacity: 100%;
    }
    main {
        @apply mx-3 my-3;
    }
</style>

<Nav />
<Notify />

<main lang={$lang}>
<slot />
</main>

<footer>
    <a href="https://twitter.com/walltowall" rel="external">
        <svg id="twitter"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
        ><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
    </a>
    <a href="https://fbook.com" rel="external">
        <svg id="facebook" fill="none" viewBox="0 0 24 24"
 stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"

        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
    </a>
    <a href="https://www.instagram.com/walltowalleg/" rel="external">
        <svg id="instagram" fill="none" viewBox="0 0 24 24"
 stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"

        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    </a>
</footer>

