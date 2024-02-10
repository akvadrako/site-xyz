import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const comp = await import(`/src/works/${params.slug}.mdx`);

    return {
        component: comp,
    };
}
