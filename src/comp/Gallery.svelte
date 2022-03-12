<script>
    import {Photo, Link} from '$comp'
    import {loadWorks} from '$lib/metadata'
    import {lang} from '$lib'
    import {keyBy, chunk} from 'lodash-es'
    import { onMount, onDestroy, getContext, setContext, tick } from 'svelte'
    
    let grid
    let masonryElement

    export const refreshLayout = async () => {
        /* get the post relayout number of columns */
        let ncol = getComputedStyle(masonryElement).gridTemplateColumns.split(' ').length

        console.log('ncol', ncol)

        grid.items.forEach(c => {
            let new_h = c.getBoundingClientRect().height;

            if(new_h !== +c.dataset.h) {
                c.dataset.h = new_h
                grid.mod++
            }
        });

        /* if the number of columns has changed */
        if(grid.ncol !== ncol || grid.mod) {
            /* update number of columns */ 
            grid.ncol = ncol;
            /* revert to initial positioning, no margin */
            grid.items.forEach(c => c.style.removeProperty('margin-top'))
            /* if we have more than one column */
            if(grid.ncol > 1) {
                grid.items.slice(ncol).forEach((c, i) => {
                    let prev_fin = grid.items[i].getBoundingClientRect().bottom /* bottom edge of item above */, 
                        curr_ini = c.getBoundingClientRect().top /* top edge of current item */;

                    c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`
                })
            }

            grid.mod = 0
        }
    }

    const calcGrid = async () => {
        if(typeof window === 'undefined')
            return

        console.log('calc-grid')
        await tick()

        if(getComputedStyle(masonryElement).gridTemplateRows == 'masonry') {
            console.log('using native masonry layout')
            return;
        }
        
        grid = {
            gap: parseFloat(getComputedStyle(masonryElement).gridRowGap),
            items: [...masonryElement.childNodes].filter(c => c.nodeType === 1 && +getComputedStyle(c).gridColumnEnd !== -1), 
            ncol: 0, 
            mod: 0
        }

        refreshLayout() /* initial load */
    }

    onMount(() => {
        window.addEventListener('resize', refreshLayout, false)
    })
    onDestroy(() => {
        if(typeof window !== 'undefined')
            window.removeEventListener('resize', refreshLayout, false)
    })


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
    $: filtered, calcGrid()

</script>

<style>
    section {
        /* break out of main */
        width: 94vw;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin: 2em auto;
        
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(Min(10em, 100%), 1fr));
        grid-template-rows: masonry;
        justify-content: center;
        justify-items: start;
        grid-gap: 10px;
        padding: 10px;
        align-items: start;

        /*
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1em;
        grid-template-rows: masonry;
        grid-auto-flow: row dense;
        justify-items: center;
        align-items: center;
        */

        /* @apply lg:(flex flex-wrap); */
    }
    section > * { 
        align-self: start 
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        align-items: start;
        justify-items: center;
        justify-content: space-evenly;
        max-width: 100vh;
        margin: auto;
    }
    a.work {
        text-decoration: none;
        position: relative;
        display: block;
        padding: 4px;

        filter: grayscale(100%);

        /*@apply my-2 w-full hh-auto;

        @apply lg:(my-0 hh-[50vh] w-auto);
         */
    }
    a.work:hover {
        filter: grayscale(0);
    }

    a.work div {
        _height: 100%;
    }
    a.work :global(img) {
        display: block;
        width: auto;
        height: 40vh;
        /*
        max-height: 100%;
        max-width: 100%;
         */
        object-fit: contain;
        object-position: 50% bottom;
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
    a.work:hover .title {
        display: flex;
        align-items: center;
        justify-items: center;
        position: absolute;
        z-index: 10;
    }
    h2 {
        margin-top: 10px;
    }
    .border {
        display: block;
        height: 20px;
        width: 100%;
        border: none;
    }
    .chooser {
        @apply flex items-left mb-4;
        float: right;
        margin: 10px;
    }
</style>

<div lang="en">
Hello. my name is iulia and wall to wall is my mural servicing center, active
in the north/south holland area. below you will find some examples of my work.
</div>

<div lang="nl">
Hallo. mijn naam is iulia en van muur tot muur is mijn muurschilderingservicecentrum, actief
in de regio noord/zuid holland. hieronder vindt u enkele voorbeelden van mijn werk. 
</div>

<p>
    If you would like to commision a mural,
    please <Link path="/contact" title="contact me" />
</p>

<div class="chooser">
{#each kinds as kind}
<div>
    <input
        id={kind.key}
        bind:checked={kind.checked}
        type="checkbox"
        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label for={kind.key} class="ml-2 mr-4">{kind.label[$lang]}</label>
</div>
{/each}
</div>

<h2>Gallery ({filtered.length} of {works.length})</h2>

<section bind:this={masonryElement}>
    {#each chunk(filtered, 100) as group}
            {#each group as work}
                <a
                    class="work"
                    href={work.path}>
                    <div class="title">
                        <h3 class="text-lg text-black font-semibold">{work.title}</h3>
                    </div>
                    <div>
                        <Photo src={work.image} alt={work.title} sizes="30vh" />
                    </div>
                    <svg class="border" height="20px" width="100%" viewBox="0 0 10 10" preserveAspectRatio="none">
                        <line x1="0.1" y1="2" x2="9.9" y2="2" stroke="#CCC" stroke-width="1px" />
                        <line x1="0.5" y1="4" x2="9.5" y2="4" stroke="#DDD" stroke-width="1px" />
                    </svg>
                </a>
            {/each}
    {/each}
</section>

