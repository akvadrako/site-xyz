
<style>
    input {
        width: 100%;
        height: 40px;
        font-size: 16px;
        padding: 0px 20px 0px 40px;
        margin-right: 10px;
        border-radius: 40px;
        outline: none;
        border: solid gray 2px;
        background: url('/sprites.svg#search') 7px center no-repeat;
        background-size: 1.5em;
    }
    
    .item {
        @apply text-gray-700 block px-4 py-2 text-sm;
    }
    .active {
        @apply bg-gray-100 text-gray-900;
    }
    
    .suggest {
        @apply origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none;
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

    $: results_link = item => $route('/search', { q: item.suggestion })

    let wrap_suggest = 
    debounce(() => {
        suggest(query).then(s => {
            suggestions = s
        })
    }, 300, {})

    beforeNavigate(() => {
        suggestions = []
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
</script>

<div class="relative"
    on:keydown={onKey}
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
