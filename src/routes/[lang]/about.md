---
title: About
---

<script>
    import {loadRoutes} from '/src/metadata'
  
    const routes = loadRoutes()
</script>

## History of Wall too Wall

For far too longs walls have gone unnoticed, hidden behind paper
and paint. This is causing huge problems in the wall rights community.
But frankly undecored walls do not deserve rights. With a wall to wall
transformation you can shutup your bare wall.

## Sitemap

  <ul>
    {#each routes as route}
      <li>
        <a href={route.path}>{route.path}</a> -- {route.label}
      </li>
    {/each}
  </ul>
