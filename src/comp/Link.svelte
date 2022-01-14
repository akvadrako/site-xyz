
<script>
    //import {getRoute} from '/src/backend/metadata'
    import {lang} from '$lib'

    export let path
    export let title
    export let ext = false

    let route = {}

    /*
     * if(title) {
     *     route = {
     *         title: title,
     *         path: '/' + $lang + path,
     *     }
     * } else {
     *     route = getRoute(path, $lang)
     * }
     */

    route = {
        title: title,
        path: '/' + $lang + path,
    }
</script>

<style>
    .link {
        margin: 0 10px;
        text-align: center;
        width: 100px;
        background: #112233;
        color: #EEFF77;
    }
</style>

<a class=link
    rel={ext && 'external'}
    sveltekit:prefetch
    href="{route.path}">{route.title}</a>
