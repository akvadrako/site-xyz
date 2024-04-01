//
// SvelteKit Hooks
//
// https://kit.svelte.dev/docs#hooks

async function handle_event({ event, resolve }) {
    console.log('handle', event.request.method, event.url.pathname)
    try {
        let response = await resolve(event)
        return response;
    } catch(e) {
        console.error('handle', e)
        return new Response('ERROR')
    }

    // read language slug
    let [, lang] = event.url.pathname.split('/')

    if(lang && response.body) {
        let body = await response.text()
        
        body = body.replace('<html>', `<html lang="${lang}">`)
 
        response = new Response(body, response)
    }

    return response
}

// export const event = handle_event;
