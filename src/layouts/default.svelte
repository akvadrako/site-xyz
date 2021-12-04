<script>  
    export let title
</script>

<svelte:head>
    <title>| Wall 2 Wall | {title} |</title>
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
    a {
        text-decoration: none;
        height: 100%;
    }
    #logo {
    }
    .link {
        margin: 0 10px;
        text-align: center;
        width: 100px;
        background: #112233;
        color: #EEFF77;
    }
</style>

<nav>
    <a id=logo href="/">
        <img src="/uploads/logo.svg" alt="home">
    </a>
    <a class=link href="/posts">news</a>
    <a class=link href="/about">about</a>
    <a class=link href="/contact">contact</a>
    <a class=link href="/help">help</a>
</nav>

<hr>

<slot />

<hr>


