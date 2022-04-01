<script>
    import Home from '../pages/index.mdx'
    import { onMount } from 'svelte';

    // netlify login
    onMount(() => {
        if (window.location.hash.includes('_token=')) {
            window.location.replace('/admin/' + window.location.hash)
        }
    });
</script>

<Home />
