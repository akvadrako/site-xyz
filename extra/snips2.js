
hits = idx.query(function (query) {
    // prefix search, no boost
    query.term("reconnaiss", { wildcard: lunr.Query.wildcard.TRAILING, boost: 1 })
    // 'exact' match, boosted
    query.term("reconnaiss", { boost: 10 })
})

<table>
    <tr><th>ref</th><th>score</th><th>path</th><th>blurb</th></tr>
    {#each hits as hit}
    <tr>
        <td>{hit.id} {hit.path}</td>
        <td>{hit.score}</td>
        <td>
        {JSON.stringify(hit)}
        <ul>
        {#each Object.entries(hit.matchData.metadata) as [field, meta] }
            {#each Object.entries(meta) as [key, pos] }
              <li>
                <b>{key}</b>: {@html highlight(routes[hit.ref][key], pos.position)}
              </li>
            {/each}
        {/each}
        </ul>
        </td>
    </tr>
    {/each}
</table>

