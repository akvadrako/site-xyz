<script context="module">
    // mdsvex wrapper
    // can provide custom components and access front-matter
    
    import { Image as img } from '$comp';
    export { img }
</script>
<script>
    export let _text = ''
    export let title = ''

    _text;
    title;
</script>

<slot />

