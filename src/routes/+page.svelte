<script>
import Home from '$comp/Home.svelte'
import { onMount } from 'svelte';

// netlify login
onMount(() => {
    if (window.location.hash.includes('_token=')) {
        window.location.replace('/admin/' + window.location.hash)
    }
});
</script>

<Home />

<div hidden>
    <p>Hidden Links for Crawling</p>
    <a href="/nl">works</a>
    <a href="/en">works</a>
    <a href="/en/search">search</a>
    <a href="/data/search_index.json">search_index.json</a>
    <a href="/en/paees.json">pages.json</a>
    <a href="/en/blog.json">blog.json</a>
    <a href="/en/blog">blog</a>
</div>
