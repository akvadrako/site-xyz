<script>
import {page} from '$app/stores'
import {search} from '$lib/search'
import {building} from '$app/environment'
import {Thumbnail} from '$comp'

$: query = building ? "" : $page.url.searchParams.get('q')
$: ahits = building ? (async () => [])() : search(query)

export const title = 'search'

function findMarks(field, term) {
    let pat = new RegExp(term, 'gi')
    let matches = field.matchAll(pat)
    let marks = []

    for(let match of matches) {
        marks.push([match.index, match[0].length])
    }

    return marks
}

// field: str content (path, body, title, etc...)
// marks: [[start, length], ...]
function highlight(field, term) {
    let marks = findMarks(field, term)
    let context = 20

    try {
        let outs = []
        for(let pair of marks) {
            let begin = Math.max(pair[0] - context, 0)
            let sub = [pair[0], pair[0] + pair[1]]
            let end = Math.min(sub[1] + context, field.length)

            //if(out)
            //    out += '<br/>'

            let out = '' // `${pair} `
                + field.substring(begin, sub[0])
                + '<mark>'
                + field.substring(sub[0], sub[1])
                + '</mark>'
                + field.substring(sub[1], end)

            outs.push(out)
        }
        return outs;
    } catch(e) {
        return `error: ${e}`
    }
}

function marks(hit) {
    let marks = []

    for(let term of hit.terms) {
        for(let field of hit.match[term]) {
            console.log(hit[field], term, field)
            for(let mark of highlight(hit[field], term)) {
                marks.push(mark)
            }
        }
    }

    return marks
}
</script>

{#await ahits}
    <div>...loading...</div>
{:then hits}
    <h2>Search results for {query} ({hits.length})</h2>

    {#each hits as hit}
        <a class="hit" href={hit.path}>
        <div class="flex justify-center w-full p-5">
            <div class="flex flex-col min-h-40 w-full sm:flex-row sm:max-w-2xl rounded-lg bg-white shadow-lg">
                <div class="side">
                    {#if hit.image}
                        <Thumbnail img="{hit.image}" alt="{hit.title}" />
                    {/if}
                </div>
                <div class="p-6 flex flex-col justify-start">
                    <h5 class="text-gray-900 text-xl font-medium mb-2">{hit.title}</h5>
                    <p class="text-gray-700 text-base text-sm mb-2">
                    {#each marks(hit) as mark, index}
                        {#if index == 0}
                            ...
                        {/if}
                        {@html mark}...
                    {/each}
                    </p>
                </div>
            </div>
        </div>
        </a>
    {/each}
{:catch error}
    <div>...{error.message}</div>
{/await}
