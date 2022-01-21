//
// SvelteKit Hooks
//
// https://kit.svelte.dev/docs#hooks

export async function handle({ event, resolve }) {
    //console.log(request.method, request.url.pathname)

    let response = await resolve(event)

    // read language slug
    let [, lang] = event.url.pathname.split('/')

    if(lang && response.body) {
        let body = await response.text()
        
        body = body.replace('<html>', `<html lang="${lang}">`)
 
        response = new Response(body, response)
    }

    return response
}

