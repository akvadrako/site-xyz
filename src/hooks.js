//
// SvelteKit Hooks
//
// https://kit.svelte.dev/docs#hooks

export async function handle({ request, resolve }) {
    //console.log(request.method, request.url.pathname)

    const response = await resolve(request)

    // read language slug
    const [, lang] = request.url.pathname.split('/')

    if(lang && response.body) {
        response.body = response.body.toString()
            .replace('<html>', `<html lang="${lang}">`)
    }

    return response
}

