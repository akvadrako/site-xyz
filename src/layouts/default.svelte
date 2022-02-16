<script>
    import {metadata as md_store} from '$lib'

    export let _text = '';
    export let title_en;
    export let title_nl;
    export let layout;

    _text;
    layout;
    title_en;
    title_nl;
    
    md_store.set({
        title_en: title_en,
        title_nl: title_nl,
    })
</script>

<slot />

