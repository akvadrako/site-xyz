
import {load_work} from '$lib/works'

export async function load({ params }) {
    return {
        component: await load_work(params.slug),
    };
}
