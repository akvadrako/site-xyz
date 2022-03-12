
<style>
    input {
        height: 40px;
        font-size: 16px;
        padding: 0px 20px 0px 40px;
        margin-right: 10px;
        outline: none;
        border: none;
        background: url('/sprites.svg#search') 7px center no-repeat;
        background-size: 1.5em;
        width: 1em;
    }
    
    .item {
        @apply text-gray-700 block px-4 py-2 text-sm;
    }
    .active {
        @apply bg-gray-100 text-gray-900;
    }
    
    .suggest {
        width: 100%;
        @apply origin-top-right absolute shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none;
    }

    .open input {
        width: 100%;
        border: solid gray 2px;
    }

    #search.open {
        max-width: 20em;
    }

    #search {
        margin: 0;
        padding: 0;
        max-width: 2em;
    }
</style>

<script>
    import { goto, route } from '$lib'
    import {debounce} from 'lodash-es'
    import {suggest} from '$lib/search'
    import {beforeNavigate} from '$app/navigation'

    let suggestions = []
    let active = -1
    let query = ''
    let open = false;

    $: results_link = item => $route('/search', { q: item.suggestion })

    let wrap_suggest = 
    debounce(() => {
        suggest(query).then(s => {
            suggestions = s
        })
    }, 300, {})

    beforeNavigate(() => {
        suggestions = []
        open = false
    })

    $: console.log('suggestions', suggestions)

    function onKey(e) {
        console.log('key', e.key)
        
        if(e.key == "Enter") {
            console.log('search', e.target.value)
            goto($route('/search', { q: e.target.value }))
            return
        }
        
        if(e.key == "Escape") {
            suggestions = []
            return
        }

        let move = 0

        if(e.key == "ArrowUp")
            move = -1
        
        if(e.key == "ArrowDown")
            move = 1

        if(move) {
            e.preventDefault()
            e.stopPropagation()
            
            active += move
            active = Math.max(-1, Math.min(suggestions.length - 1, active))

            console.log(active, move)

            if(active >= 0)
                query = suggestions[active].suggestion

            return
        }
        
        wrap_suggest()
    }

    function click() {
        open = true
        console.log('opened')
    }
</script>

<div class="relative"
    id="search"
    class:open
    on:keydown={onKey}
    on:click={click}
>
    <input type="search"
        bind:value={query}
        placeholder="search..." />

    {#if suggestions.length > 0}
    <div class="suggest"
        role="menu"
        tabindex="-1">
        <div class="py-1" role="none">
            {#each suggestions as item, i}
                <a href={results_link(item)}
                    class:item
                    class:active={i == active}
                    role="menuitem"
                    tabindex="-1"
                >{item.suggestion}</a>
            {/each}
        </div>
    </div>
{/if}
</div>
