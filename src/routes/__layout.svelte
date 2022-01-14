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
        createToast(`Unhandled Promise: ${event.reason}`)
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent
    function onerror(event) {
        createToast(`Error: ${event.message}`)
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
        text-align: center;
        margin-top: 10px;
    }
    footer img {
        height: 40px;
        width: 40px;
        margin: 0 40px;
        opacity: 50%;
        display: inline-block;
    }
    hr {
        border: 1px solid black;
        margin: 1px 0;
        clear: both;
    }
    footer img:hover {
        opacity: 100%;
    }
    main {
        margin: 10px 20px;
    }
</style>

<Nav />
<Notify />

<hr />

<main lang={$lang}>
<slot />
</main>

<hr />

<footer>
    <a href="https://twitter.com/walltowall" rel="external">
        <img src="/sprites.svg#twitter" alt='twitter' />
    </a>
    <a href="https://fbook.com" rel="external">
        <img src="/sprites.svg#facebook" alt='facebook' />
    </a>
    <a href="https://www.instagram.com/walltowalleg/" rel="external">
        <img src="/sprites.svg#instagram" alt='instagram' />
    </a>
</footer>

