//
// SvelteKit Hooks
//
// https://kit.svelte.dev/docs#hooks

export async function __handle({ request, resolve }) {
    let orig = request.path

    if (request.path.startsWith('/en')) {
        request.locals.lang = 'en'
        request.path = request.path.replace('/en', '/')
    }
    
    console.log('path', request.path, orig)

    const response = await resolve(request);

    if (response.body) {
        console.log('body', response.body.substr(0, 20))
        response.body = response.body.replace('<html', '<html lang="en,nl"')
    }

    return {
            ...response,
    };
};

export function __getSession(request) {
    return {
        lang: request.locals.lang
    }
}
