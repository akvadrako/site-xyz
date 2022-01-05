<script>
    import { page } from '$app/stores';
    import { lang } from '$lib';
    import { Link, Search } from '$comp';
    import Notify from '$comp/Notify';

    export let title = ''
</script>

<svelte:head>
    <title>Wall 2 Wall | {title} |</title>
    <meta http-equiv="content-language" content="{$lang}" />
    <style>
        nav a {
            text-decoration: none;
            height: 100%;
        }
    </style>
</svelte:head>

<style>
    nav {
        height: 39px;
        margin: 8px;
        line-height: 40px; 
        display: flex;
    }
    nav img {
        height: 100%;
        width: 200px;
        height: 100%;
    }
    #logo {
        background: transparent;
    }
    footer {
        text-align: center;
    }
    footer img {
        height: 40px;
        width: 40px;
        margin: 0 40px;
        opacity: 50%;
    }
    footer img:hover {
        opacity: 100%;
    }
</style>

<nav>
    <a id=logo href="/">
        <img src="/media/logo.svg" alt="home">
    </a>
    <Link title="About" path="/about" />
    <Link title="Contact" path="/contact" />
    <Link title="Help" path="/help" />

    {#if $lang == 'nl'}
        <a href="{$page.url.pathname.replace('/nl', '/en')}">EN</a> / <b>NL</b>
    {:else}
        <b>EN</b> / <a href="{$page.url.pathname.replace('/en', '/nl')}">NL</a>
    {/if}

    <Search />
</nav>
<Notify />

<hr>

<main lang={$lang}>
<slot />
</main>

<hr>

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

