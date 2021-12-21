---
label: Home
title: Wall To Wall
layout: false
---

<script>
    import IndexEnglish from '/src/routes/[lang]/index.md'

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { browser } from '$app/env';

    if (browser && $page.path == '/') {
        goto('/en', {replaceState: true})
    }

</script>

<IndexEnglish />
