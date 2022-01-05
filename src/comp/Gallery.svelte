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

<section>
    {#each pics as pic}
       <img src='/media/{pic.path}' alt={pic.path} />
    {/each}
</section>
