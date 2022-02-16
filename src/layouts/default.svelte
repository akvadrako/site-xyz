<script context="module">
    // mdsvex wrapper
    // can provide custom components and access front-matter
    
    import { Photo as img } from '$comp';
    export { img }
</script>
<script>
    export let _text = '';
    export let title = '';
    export let title_en = '';
    export let title_nl = '';

    _text;
    title;
    title_en;
    title_nl;
</script>

<slot />

