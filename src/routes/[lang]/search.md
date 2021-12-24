---
title: Search
---
<script>
    import { onMount } from 'svelte'
    import {lang} from '$lib'
    import {Link} from '$comp'
    import _ from 'lodash'

    export const title = 'search'

    let query = 'home'
    let idx
    let hits = []

    onMount(async () => {
        const res = await fetch(`/${lang}/search_index.json`)
        const data = await res.json()

        idx = new Fuse(data.routes, {
            //keys: data.keys,
            includeScore: true,
            includeMatches: true,
        }, Fuse.parseIndex(data.index))

        search()
    })

    let search = _.debounce(
        () => {
            hits = idx.search(query)
        },
        300,
        {},
    )

    function highlight(value, indexes, i=1) {
        const pair = indexes[indexes.length - i]
        if(! pair)
            return value

        return highlight(value.substring(0, pair[0]), indexes, i+1)
            + '<mark>'
            + value.substring(pair[0], pair[1]+1)
            + '</mark>'
            + value.substring(pair[1]+1)
    }

</script>
<Link title='search_index.json' ext={true} path='/search_index.json' />
<p>
    <input
        type="text"
        placeholder="Type here to search"
        on:change={search}
        bind:value={query}
    />
    <input type="submit" value="search" on:click={search.flush} />
</p>
<p>
Syntax: '*' is wildcard. 'title:foo',
search only in title, fuzzy: 'foo~1'
exclude: '-foo'
</p>

<table>
    <tr><th>ref</th><th>score</th><th>path</th><th>blurb</th></tr>
    {#each hits as hit}
    <tr>
        <td>{hit.item.title}</td>
        <td>{hit.score}</td>
        <td>{hit.item.path}</td>
        <td>
        <ul>
        {#each hit.matches as m}
            {#if m.indices}
                <li><b>{m.key}</b>: {@html highlight(m.value, m.indices)}</li>
            {/if}
        {/each}
        </ul>
        </td>
    </tr>
    {/each}
</table>

