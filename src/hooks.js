//
// SvelteKit Hooks
//
// https://kit.svelte.dev/docs#hooks

export async function handle({ event, resolve }) {
    //console.log(request.method, request.url.pathname)

    const response = await resolve(event)

    // read language slug
    const [, lang] = event.url.pathname.split('/')

    if(lang && response.body) {
        response.body = response.body.toString()
            .replace('<html>', `<html lang="${lang}">`)
    }

    return response
}

