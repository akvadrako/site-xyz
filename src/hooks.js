//
// SvelteKit Hooks
//
// https://kit.svelte.dev/docs#hooks

export async function handle({ event, resolve }) {
    console.log(event.request.method, event.url.pathname)

    let response = await resolve(event)

    return response;

    // read language slug
    let [, lang] = event.url.pathname.split('/')

    if(lang && response.body) {
        let body = await response.text()
        
        body = body.replace('<html>', `<html lang="${lang}">`)
 
        response = new Response(body, response)
    }

    return response
}

