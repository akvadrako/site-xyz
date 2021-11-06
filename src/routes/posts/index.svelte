<script>  
  import {routes} from '/src/metadata'
  import Chart from '/src/comp/Chart.svelte';
</script>

<svelte:head>
    <title>Welcome - Posts</title>
</svelte:head>

<h1>Posts</h1>

# Here’s a chart

The chart is rendered inside our MDsveX document.

<Chart />

<ul>
{#each routes as route}
    <li>
        <a href={route.path}>{route.path} -- {route.label}</a>
    </li>
{/each}
</ul>
