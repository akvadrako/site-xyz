<script>
import {Photo} from '$comp'
import {lang} from '$lib'
import {page} from '$app/stores'

export let max = 99;

const keyBy = (array, key) => (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

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

$: bykey = keyBy(kinds, 'key')
$: filtered = $page.data.works.filter(w => bykey[w.kind || 'mural'].checked).slice(0, max)

</script>

{#if max > 10}
<div class="chooser flex flex-wrap items-left text-xl my-8">
    {#each kinds as kind}
    <div class="ws-nowrap cursor-pointer">
        <input
            id={kind.key}
            bind:checked={kind.checked}
            type="checkbox"
            class="bg-$theme-text v--9% w-5 h-5 border-none m-0 p-0 appearance-none checked:bg-$orange hover:ring-2 ring-black"
        />
        <label for={kind.key} class="ml-2 mr-4 cursor-pointer">{kind.label[$lang]}</label>
    </div>
    {/each}
</div>
{/if}

<section class="my-4">
    {#each filtered as work}
        <div class="cell">
            <div class="work w-auto">
                <a class="flex-1" href={work.path}>
                    <Photo
                        src={work.image.path}
                        width={work.image.width}
                        height={work.image.height}
                        alt={work.title}
                        sizes="30vw"
                    />
                </a>
                <div class="title flex leading-tight text-lg text-black font-semibold">
                    <div>
                        <span class="case-upper">{work.title}</span>
                        <br>{work.kind}
                    </div>
                </div>
            </div>
        </div>
    {/each}
</section>

<style lang="postcss">

.work {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.work a {
    text-decoration: none;
    position: relative;
    display: block;
    overflow: hidden;
}
.title {
    pointer-events: none;
    display: none;
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--brown);
    color: var(--sandstone);
    padding: 10px;
    opacity: 80%;
    justify-content: center;
}
.work:hover .title {
    display: flex;
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
    .work {
        margin-top: 48px;
        margin-bottom: 48px;
    }
}

@media (min-width: 1024px) {
    section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 24px;
    }
}
</style>

