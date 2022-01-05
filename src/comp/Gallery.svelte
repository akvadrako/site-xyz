<script>
    const pics = [
        {
            path: 'woman-cropped.jpeg',
        },
        {
            path: 'woman-cropped.jpeg',
        }
    ]
</script>

<style>
    img {
        height: 200px;
        border: 10px solid black;
        margin: 20px;
    }
</style>

[en]You've found yourself wanting a wall to wall service. So please
rech out by <b>approaching the [[Contact|About]] pagey.</b>

[nl]NL intro [[Contact]]

<section>
    {#each pics as pic}
       <img src='/media/{pic.path}' alt={pic.path} />
    {/each}
</section>

<p>
Prices: €100 - €200 / m²
</p>
