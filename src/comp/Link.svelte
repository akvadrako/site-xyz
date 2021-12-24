
<script>
    import {getRoute} from '/src/metadata'
    import {lang} from '$lib'

    export let path
    export let title

    let route = {}

    if(title) {
        route = {
            title: title,
            path: '/' + $lang + path,
        }
    } else {
        route = getRoute(path, $lang)
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

<a class=link href="{route.path}">{route.title}</a>
