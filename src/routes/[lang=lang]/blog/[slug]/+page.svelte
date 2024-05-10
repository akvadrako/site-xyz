<script>
import {Photo} from '$comp';
import {lang} from '$lib';

export let data
</script>

<div class="sm:(mx-32)">
    <div class="pb-14 w-full flex frame sm:(max-h-[40vh])">
        <div>
            <Photo src={data.doc.image} />
        </div>
    </div>

    <section class="max-w-xl">
        <h1 class="font-semibold text-3xl">{data.doc.title}</h1>
        
        {@html data.doc.body}
    </section>

    <div class="font-medium text-2xl text-right">
        <a href="/{$lang}/blog">View More Posts &gt;</a>
    </div>
</div>
    
<style>
    .frame :global(img) {
        object-fit: contain;
        object-position: center;
        width: 100%;
        height: 100%;
    }
</style>
