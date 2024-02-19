<script>
import {Photo} from '$comp'
import {loadWorks} from '$lib/metadata'
import {lang} from '$lib'

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

let works = loadWorks($lang)

$: bykey = keyBy(kinds, 'key')
$: filtered = works.filter(w => bykey[w.kind || 'mural'].checked)

</script>

<div class="chooser flex items-left text-2xl my-8">
    {#each kinds as kind}
    <div>
        <input
            id={kind.key}
            bind:checked={kind.checked}
            type="checkbox"
            class="text-[#3D3732] bg-[#3D3732] v--9% w-5 h-5 border-none m-0 p-0 appearance-none"
        />
        <label for={kind.key} class="ml-2 mr-4">{kind.label[$lang]}</label>
    </div>
    {/each}
</div>

<section class="my-8">
    {#each filtered as work}
    <div class="work">
        <a class="flex-1" href={work.path}>
            <Photo
                src={work.image}
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
    background-color: #6a645f;
    color: #F2EDE8;
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

