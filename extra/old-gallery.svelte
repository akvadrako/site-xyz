
<script>
const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};
</script>

{#each chunk(filtered, 30) as group}
    <div class="group">
        {#each group as work}
            <div class="work">
                <a
                    href={work.path}>
                    <div class="title">
                        <h3 class="text-lg text-black font-semibold">{work.title}</h3>
                    </div>
                    <div>
                        <Photo src={work.image} alt={work.title} sizes="30vh" class="" />
                    </div>
                    <svg class="border" height="20px" width="100%" viewBox="0 0 10 10" preserveAspectRatio="none">
                        <line x1="0.1" y1="2" x2="9.9" y2="2" stroke="#CCC" stroke-width="1px" />
                        <line x1="0.5" y1="4" x2="9.5" y2="4" stroke="#DDD" stroke-width="1px" />
                    </svg>
                </a>
            </div>
        {/each}
    </div>
{/each}
</section>

<style lang="postcss">

.work a {
    text-decoration: none;
    position: relative;
    display: block;
}
.title {
    display: none;
}
.title h3 {
    background: #EEEEEE99;
    color: black;
    padding: 10px;
    margin: auto;
}
.work:hover .title {
    display: flex;
    align-items: center;
    justify-items: center;
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.border {
    display: block;
    height: 20px;
    width: 100%;
    border: none;
}

@media (hover: hover) {
    .work {
        filter: grayscale(20%);
    }
    .work:hover {
        filter: grayscale(0);
    }
}

@media (max-width: 1023px) {
    .work :global(img) {
        display: block;
        width: 100%;

        object-fit: contain;
    }
    .work {
        width: 100%;
    }
}

@media (min-width: 1024px) {
    .group {
        _justify-items: center;
        _max-width: 160vh;
        margin: auto;
        clear: both;
    }
    .work {
        margin: 8px;
        width: 
        min-width: 40vh;
        width: auto;
        display: inline-flex;
        _justify-items: center;
    }
    .work a {
        width: auto;
        margin: auto;
    }
}
</style>

