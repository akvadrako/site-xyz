<script context="module">
    import {pages} from '$lib'
    import {get} from 'svelte/store'

    const data_href = '/data/pages.json'

    export async function load({ fetch}) {
        if(get(pages) === null) {
            console.log('load pages')
            const resp = await fetch(data_href)
            pages.set(await resp.json())
        }

        return {}
    }
</script>

<script>
    import JsonView from '@zerodevx/svelte-json-view/src/JsonView.svelte'
    import {toasts} from '$lib/toasts'
</script>

<h1>Play</h1>

$pages: <JsonView json={$pages} depth={1} />

$toasts: <JsonView json={$toasts} depth={1} />

