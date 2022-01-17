<script>
    import { page } from '$app/stores';
    import { lang } from '$lib';
    import { Link, Search } from '$comp';
    
    let menu
    let open = false

    const navItems = [
        { 
            path: '/about',
            label: { en: 'About', nl: 'Over' },
        },
        { 
            path: '/contact',
            label: { en: 'Contact', nl: 'Contact' },
        },
    ]

    for(let n of navItems) {
        n.current = $page.url.pathname == `/${lang}/${n.path}`
    }

    $: console.log('open', open, navItems)

    function onClick(event) {
        open = !open;

        /* createPopper(element, menu, { */
        /*     placement: placement ? placement : 'bottom-start', */
        /*     modifiers: [ */
        /*         { */
        /*             name: 'offset', */
        /*             options: { */
        /*                 offset: [0, 10] */
        /*             }, */
        /*         }, */
        /*     ] */
        /* }); */

        function handleDropdownOutsideClick(event) {
            if (event.target == menu || menu.contains(event.target))
                return;
            
            event.preventDefault()
            open = false
            document.body.removeEventListener('click', handleDropdownOutsideClick, true);
        }

        if(! open) {
            document.body.addEventListener('click', handleDropdownOutsideClick, true)
        }
    }
</script>

<style>
    nav {
        height: 39px;
        margin: 8px;
        line-height: 40px; 
        display: flex;
        gap: 10px;
        justify-content: space-between;
    }
    nav img {
        height: 100%;
        width: 200px;
    }
    #logo {
        height: 100%;
        width: 200px;
    }
    
    button {
        position: absolute;
        left: 0px;
        top: 0px;
        margin: 5px;
        z-index: 10;
        background-color: Transparent;
        background-repeat: no-repeat;
        border: none;
        cursor: pointer;
        overflow: hidden;
        outline: none;
    }
    svg line {
        stroke: currentColor;
        stroke-width: 3;
    }
    /* rotate the top line */
    .open #top {
        transform: translate(10px, 0px) rotate(45deg)
    }
    /* hide the middle */
    .open #mid {
        opacity: 0
    }
    /* rotate the bottom line */
    .open #bot {
        transform: translate(-15px, 8px) rotate(-45deg)
    }
    @media (min-width: 640px) {
        #sidebar {
            display: none;
        }
        .link {
            display: block;
        }
    }
    @media (max-width: 640px) {
        #sidebar {
            display: block;
            transition: left 0.4s ease-in-out;
            position: absolute;
            height: 100vh;
            top: 0px;
            left: -300px;
            overflow-y: auto;
            width: 300px;
            background: #11111199;
        }
        .link {
            display: none;
        }
        
        ul {
            display: flex;
            flex-direction: column;
        }
        
        #menu {
            text-align: left;
            padding: 25px;
            padding-top: 50px;
        }
        #sidebar.open {
            left: 0px;
        }
    }
    h1 {
        font-size: inherit;
    }
</style>

<nav class="border-gray-200 px-2 sm:px-4 rounded items-center mx-auto">
    <a id="logo" href="/{$lang}">
        <img class="mr-3 h-5" src="/media/logo.svg" alt="home">
    </a>

    <a
        href="/{$lang}"
        class="link block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">
        <h1>Wall To Wall</h1>
    </a>

    
    <button class:open on:click={onClick} class="sm:hidden" style="transition: color 0.4s ease-in-out;">
        <svg width=32 height=32>
            <line id="top" x1=0 y1=9    x2=32 y2=9    style="transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;"/>
            <line id="mid" x1=0 y1=18.5 x2=32 y2=18.5 style="transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;"/>
            <line id="bot" x1=0 y1=28    x2=32 y2=28  style="transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;"/>
        </svg>
    </button>
        
    {#each navItems as item}
        <a
            href="/{$lang}{item.path}"
            class="link block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" 
            aria-current={ item.current ? "page" : '' }>
            {item.label[$lang]}
        </a>
    {/each}

    <div bind:this={menu} id="sidebar" class:open>
        <ul id="menu" class="flex mt-4">
            {#each navItems as item}
            <li>
                <a href="/{$lang}{item.path}"
                    class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="{ item.current ? 'page' : '' }"
                >
                    {item.label[$lang]}
                </a>
            </li>
            {/each}
        </ul>
    </div>

    <span class="md:w-64 w-16">
        <Search />
    </span>
    
    <span class="w-16">
        {#if $page.url.pathname == '/'}
            <b>EN</b> / <a href="/nl">NL</a>
        {:else if $lang == 'nl'}
            <a href="{$page.url.pathname.replace('/nl', '/en')}">EN</a> / <b>NL</b>
        {:else}
            <b>EN</b> / <a href="{$page.url.pathname.replace('/en', '/nl')}">NL</a>
        {/if}
    </span>
</nav>

