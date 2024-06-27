<script>
import {Photo} from '$comp';
import {lang} from '$lib';

export let data
export let img = data.doc.image
</script>

<div class="sm:(mx-32) -mt-12">
    <div class="pb-14">
        <Photo 
                src={img.path}
                width={img.width}
                height={img.height}
                alt="heading"
                sizes="50vw"
                divcls="max-h-[30vh] max-w-full bg-center bg-cover"
        />
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
</style>
