
import { disableScrollHandling, afterNavigate } from '$app/navigation';
import { onMount } from 'svelte';

onMount(() => {
    console.log('onMount')
    //disableScrollHandling()
})

afterNavigate(({ from, to }) => {
    // noscroll or targeted element 
    if(window.scrollY != 0)
        return;

    // initial page load
    if(! from)
        return;

    /*
    see client.js
    const deep_linked = to.hash && document.getElementById(to.hash.slice(1));
    if (deep_linked) {
        deep_linked.scrollIntoView();
    const scroll = scroll_positions[current_history_index];
	if (scroll) scrollTo(scroll.x, scroll.y);
    if (scroll) {
        scrollTo(scroll.x, scroll.y);
        return;
    }

    window.scrollY = main.getBoundingClientRect().top + window.pageYOffset - 100
    */

    window.scrollTo({
        top: main.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: 'auto',
    });
})
