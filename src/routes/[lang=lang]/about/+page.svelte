<script>
import Hero from '$comp/Hero.svelte';

export let data;
</script>

<Hero />

{@html data.content}

