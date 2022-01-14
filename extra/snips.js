

    setTimeout(async () => {
        console.trace("Here I am!")
        let log = (await import('why-is-node-running')).default
        log()
    }, 1000)
export function __getSession(request) {
    return {
        lang: request.locals.lang
    }
}
<script context="module">
    import {default as Gallery, load as gload} from '$comp/Gallery'
    export async function load({ fetch }) {
        return await gload({ fetch })
    }
</script>
<script context="module">
    // must be called for load function on page
    export async function load({ fetch }) {
        console.log('loading works')
        const res = await fetch('/data/works.json');

        if (! res.ok)
            throw new Error(`Could not load ${url}`)

        return {
            props: {
                data: await res.json()
            }
        };
    }
</script>
