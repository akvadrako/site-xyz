<script>
    export let title
</script>

<svelte:head>
    <title>Playground {title}</title>
</svelte:head>

<h1>{title}</h1>

<slot />

<hr>

