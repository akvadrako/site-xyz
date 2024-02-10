
export const prerender = true;

const data_href = '/data/pages.json'

export async function load({fetch}) {
    console.log('loading routes')
    const resp = await fetch(data_href)

    return {
        routes: (await resp.json()).routes
    }
}
