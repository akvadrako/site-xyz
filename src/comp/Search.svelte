
<style lang="postcss">
#icon {
    position: absolute;
}

#icon img {
    display: block;
    max-width: 100%;
    height: auto;
}

input {
    outline: none;
    border: solid gray 2px;
    width: 100%;
}

.suggest {
    width: 100%;
}
</style>

<script>
    import { goto, route } from '$lib'
    import {suggest} from '$lib/search'
    import {beforeNavigate} from '$app/navigation'

    let suggestions = []
    let active = -1
    let query = ''
    let open = false;

    $: results_link = item => $route('/search', { q: item.suggestion })

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
                var context = this, args = arguments;
                clearTimeout(timeout);
                if (immediate && !timeout) func.apply(context, args);
                timeout = setTimeout(function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                }, wait);
        };
    }

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

    function onKey(e) {
        console.log('key', e.key)
        
        if(e.key == "Enter") {
            console.log('search', e.target.value)
            goto($route('/search', { q: e.target.value }))
            return
        }
        
        if(e.key == "Escape") {
            open = false
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
        console.log("open", open)
    }
</script>

<div
    class="box relative text-black h-8 {open ? "w-80" : "w-8"}"
>

<div id="icon" on:click={click} class="w-6 h-6 m-1">
    <img src='/sprites.svg#search' />
</div>

    <input type="search"
        bind:value={query}
        on:keydown={onKey}
        placeholder="search..." 
        class="pl-8 h-8 { open || 'hidden' }"
    />

    {#if suggestions.length > 0}
    <div class="suggest overflow-hidden origin-top-right absolute shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        tabindex="-1">
        <div class="py-1" role="none">
            {#each suggestions as item, i}
                <a href={results_link(item)}
                    class="text-gray-700 block px-4 py-2 text-sm
                        { i == active && 'bg-gray-100 text-gray-900'}"
                    role="menuitem"
                    tabindex="-1"
                >{item.suggestion}</a>
            {/each}
        </div>
    </div>
    {/if}
</div>
