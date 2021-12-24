<script>
    import { page } from '$app/stores';
    import { lang } from '$lib';
    import { Link } from '$comp';

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
        *[lang="en"] {
            background: red;
        }
        *[lang="nl"] {
            background: yellow;
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
    img {
        height: 100%;
        width: 200px;
        height: 100%;
    }
    #logo {
    }
</style>

<nav>
    <a id=logo href="/">
        <img src="/uploads/logo.svg" alt="home">
    </a>
    <Link title="About" path="/about" />
    <Link title="Contact" path="/contact" />
    <Link title="Help" path="/help" />

    {#if $lang == 'nl'}
        <a href="{$page.path.replace('/nl', '/en')}">EN</a> / <b>NL</b>
    {:else}
        <b>EN</b> / <a href="{$page.path.replace('/en', '/nl')}">NL</a>
    {/if}
    
    <Link title="Search" path="/search" />
</nav>

<hr>

<slot />

<hr>


