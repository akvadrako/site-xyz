
<script>
    //import {getRoute} from '/src/backend/metadata'
    import {lang} from '$lib'

    export let path
    export let title
    export let ext = false

    let route = {
        title: title,
        path: '/' + $lang + path,
    }

    /*
     * if(title) {
     *     route = {
     *         title_en: title,
     *         path: '/' + $lang + path,
     *     }
     * } else {
     *     route = getRoute(path, $lang)
     * }
     */

</script>

<style>
</style>

<a class=link
    rel={ext && 'external'}
    sveltekit:prefetch
    href="{route.path}">{route.title}</a>
