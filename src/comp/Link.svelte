
<script>
    import {getRoute} from '/src/metadata'
    import {lang} from '$lib'

    export let slug

    const route = getRoute(slug, $lang)
    
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

<a class=link href="/en/{slug}">{route.title}</a>
