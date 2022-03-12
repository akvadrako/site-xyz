<script>
    import {Photo, Link} from '$comp'
    import {loadWorks} from '$lib/metadata'
    import {lang} from '$lib'
    import {keyBy, chunk} from 'lodash-es'

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

<style>
    section {
        /* break out of main */
        width: 94vw;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin: 2em auto;
    }

    .group {
        justify-items: center;
        max-width: 160vh;
        margin: auto;
        clear: both;
    }
    .work {
        position: relative;
        padding: 4px;
        margin: 8px;
        filter: grayscale(100%);
    }
    .work a {
        text-decoration: none;
    }
    @screen lg {
        .work {
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

    .work:hover {
        filter: grayscale(0);
    }

    .work :global(img) {
        display: block;
        width: 100%;
        
        @apply lg:(my-0 h-[40vh] _w-auto);
       
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
        width: 100%;
        height: 100%;
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

<section>

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

    {#each chunk(filtered, 30) as group}
        <div class="group">
            {#each group as work}
                <div class="work">
                    <div class="title">
                        <h3 class="text-lg text-black font-semibold">{work.title}</h3>
                    </div>
                <a
                    href={work.path}>
                    <div>
                        <Photo src={work.image} alt={work.title} sizes="30vh" />
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

