//
// SvelteKit Hooks
//
// https://kit.svelte.dev/docs#hooks

export async function __handle({ request, resolve }) {
    //console.log(request.method, request.url.pathname)

    return await resolve(request);
};

