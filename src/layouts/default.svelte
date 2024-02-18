<!-- svelte-ignore unused-export-let -->
<script>
import {metadata as md_store} from '$lib'

export let _text = '';
export let title_en;
export let title_nl;
export let layout = "";
export let data = {};
export let form = null;
export let slug;
export let noindex = false;

// to avoid warnings
_text;
layout;
title_en;
title_nl;



md_store.set({
    title_en: title_en,
    title_nl: title_nl,
})
</script>

<slot />

