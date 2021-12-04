<script>  
  import {loadRoutes} from '/src/metadata'
  
  const routes = loadRoutes()
</script>

<svelte:head>
    <title>Welcome - Posts</title>
</svelte:head>

<ul>
{#each routes as route}
    <li>
        <a href={route.path}>{route.path} -- {route.label}</a>
    </li>
{/each}
</ul>
