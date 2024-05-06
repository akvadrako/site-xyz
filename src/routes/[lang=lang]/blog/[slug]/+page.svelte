<script>
import Hero from '$comp/Hero.svelte';

export let data

console.log('HERE')

</script>

<Hero />

{@html data.doc.body}
