<script>
import {Photo} from '$comp'
import {lang} from '$lib'
import {page} from '$app/stores'
import {localDoc} from '$lib/docs'

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

let works = $page.data.works

$: bykey = keyBy(kinds, 'key')
$: filtered = (
    works
    .filter(w => bykey[w.kind || 'mural'].checked)
    .map(w => localDoc(w, $page.data.lang))
)

</script>

<div class="chooser flex flex-wrap items-left text-xl my-8">
    {#each kinds as kind}
    <div class="ws-nowrap cursor-pointer">
        <input
            id={kind.key}
            bind:checked={kind.checked}
            type="checkbox"
            class="bg-$theme-text v--9% w-5 h-5 border-none m-0 p-0 appearance-none checked:bg-[#E08331] hover:ring-2 ring-black"
        />
        <label for={kind.key} class="ml-2 mr-4 cursor-pointer">{kind.label[$lang]}</label>
    </div>
    {/each}
</div>

<section class="my-8">
    {#each filtered as work}
    <div class="work">
        <a class="flex-1" href={work.path}>
            <Photo
                src={work.image.path}
                alt={work.title}
                sizes="30vw"
                class="h-full w-full object-[50%_0%]" 
            />
        </a>
        <div class="title flex leading-tight text-lg text-black font-semibold">
            <div>
                <span class="case-upper">{work.title}</span>
                <br>{work.kind}
            </div>
        </div>
        <svg class="border" height="20px" width="100%" viewBox="0 0 10 10" preserveAspectRatio="none">
            <line x1="0.1" y1="2" x2="9.9" y2="2" stroke="#CCC" stroke-width="1px" />
            <line x1="0.5" y1="4" x2="9.5" y2="4" stroke="#DDD" stroke-width="1px" />
        </svg>
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
    bottom: 20px;
    background-color: var(--brown);
    color: var(--sandstone);
    padding: 10px;
    opacity: 80%;
    justify-content: center;
}
.work:hover .title {
    display: flex;
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
}

@media (min-width: 1024px) {
    .work {
        height: calc((100vw - 110px) / 3);
        width: calc((100vw - 110px) / 3);
    }
    .work :global(img) {
        object-fit: cover;
    }
    section {
        display: grid;
        justify-items: stretch;
        align-items: stretch;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 24px;
    }
}
</style>

