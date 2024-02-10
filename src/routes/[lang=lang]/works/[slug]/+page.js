
import {load_work} from '/src/works'

export async function load({ params }) {
    return {
        component: await load_work(params.slug),
    };
}
