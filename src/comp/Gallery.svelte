<script>
import {Photo} from '$comp'
import {loadWorks} from '$lib/metadata'
import {lang} from '$lib'

const keyBy = (array, key) => (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

let kinds = [
    {
        key: 'illustration',
        label: { en: 'Illustrations', nl: 'Illustraties' },
        checked: true,
    },
    {
        key: 'mural',
        label: { en: 'Murals', nl: 'Muurschilderingen' },
        checked: true,
    },
    {
        key: 'painting',
        label: { en: 'Paintings', nl: 'Schilderijen' },
        checked: true,
    },
]

let works = loadWorks($lang)

$: bykey = keyBy(kinds, 'key')
$: filtered = works.filter(w => bykey[w.kind || 'mural'].checked)

</script>

<section id="gallery" class="m-8">

<div class="chooser flex items-left mb-4 text-2xl">
{#each kinds as kind}
<div>
    <input
        id={kind.key}
        bind:checked={kind.checked}
        type="checkbox"
        style="color: #3D3732; background-color: #3D3732;"
        class="w-5 h-5 align-baseline border-none m-0 p-0 appearance-none"
    />
    <label for={kind.key} class="ml-2 mr-4">{kind.label[$lang]}</label>
</div>
{/each}
</div>

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
                        <Photo src={work.image} alt={work.title} sizes="30vh" class="my-0 h-[40vh]" />
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
/* <lg */
.work {
    width: 100%;
    margin: 8px 0;
}

@media (hover: hover) {
    .work {
        filter: grayscale(20%);
    }
    .work:hover {
        filter: grayscale(0);
    }
}

@media (min-width: 1024px) {
    #gallery {
        /* break out of main */
        width: min(94vw, 160vh);
        _position: relative;
        _left: 50%;
        _transform: translateX(-50%);
        margin: 4px auto;
    }

    .group {
        justify-items: center;
        _max-width: 160vh;
        margin: auto;
        clear: both;
    }
    .work {
        padding: 4px;
        margin: 8px;
        min-width: 40vh;
        width: auto;
        display: inline-flex;
        justify-items: center;
    }
    .work a {
        width: auto;
        margin: auto;
    }
}

.work :global(img) {
    display: block;
    width: 100%;

    object-fit: contain;
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
h2 {
    margin: 10px 4px 4px 4px;
}
.border {
    display: block;
    height: 20px;
    width: 100%;
    border: none;
}
</style>

