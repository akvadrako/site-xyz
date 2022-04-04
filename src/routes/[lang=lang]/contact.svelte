<script context="module">
    export const metadata = {
        title_en: 'Contact',
        title_nl: 'Contact',
        _text: 'contact form email inquery',
    }
</script>

<script>
    import { base, lang } from '$lib';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { browser } from '$app/env';
    import {metadata as md_store} from '$lib'
    
    md_store.set(metadata)

    let form;

    async function submit(e) {
        e.preventDefault()

        let reply = await fetch(base, { //window.location.toString(), {
            method: 'POST',
            mode: 'no-cors',
            //headers: { "Content-Type": "multipart/form-data" },
            //headers: { "Content-Type": undefined },
            body: new FormData(form),
        })
        console.log('form', reply)

        if(reply.status == 200 || reply.status == 0) {
            goto('#done')
        } else {
            goto('#error')
        }
    }

    $: console.log('hash', $page.url.hash)
    $: hash = $page.url.hash;
</script>

<h2 class="md">
    <span lang="en">Inquiry</span>
    <span lang="nl">Contact</span>
</h2>

<div class:hidden={hash != '#error'} class="bg-red-50 border-l-4 border-red-400 p-4">
    <div class="flex">
        <div class="flex-shrink-0">
            <!-- Heroicon name: solid/x-circle -->
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
        </div>
        <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <p class="text-sm text-red-700">
                There was an error submitting the form. Sorry about that,
                please try emailing me at <a href="mailto:info@doubly.so">info@doubly.so</a>.
            </p>
        </div>
    </div>
</div>

<div class:hidden={hash != '#done'} class="bg-green-50 border-l-4 border-green-400 p-4">
    <div class="flex">
        <div class="flex-shrink-0">
            <!-- Heroicon name: solid/check-circle -->
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        </div>
        <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">Success</h3>
            <p class="text-sm text-green-700">
                Thank you, your inquiry has been sent. I'll try to get back to you soon.
            </p>
        </div>
    </div>
</div>

<form
    class:hidden={hash == '#done' || hash == '#error'}
    bind:this={form}
    name="contact"
    method="POST"
    data-netlify="true"
>
    <input type="hidden" name="form-name" value="contact">
    <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your name</label>
        <input name="name" type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Joe Joesph Justified" required>
    </div>
    <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
        <input name="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="who@woo.com" required>
    </div>
    <div class="mb-6">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
        <textarea name="message" id="message" rows="4" class="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
    </div>
    <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="photo">Upload file</label>
        <input name="photo" aria-describedby="user_avatar_help" id="user_avatar" type="file">
        <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="photo">A photo of the place for a mural</div>
    </div>
    <button on:click={submit} name="submit" type="submit">Send</button>
</form>
            
<section class="my-8 py-2 flex gap-2">
    <x-area>
        <img src="/media/delft.jpg" alt="delft map" />
        <h2>Delft</h2>
        <div>
2611 KR Delft
Netherlands

T: +31 (0)65 353 42 22
        </div>
    </x-area>
    <x-area>
        <img src="/media/amdam.jpg" alt="amdam map" />
        <h2>Amsterdam</h2>
        <div>
1013 LC Amsterdam
Netherlands

T: +31 (0)65 353 42 22
        </div>
    </x-area>
</section>

<style type="postcss">
x-area {
    width: 50%;
    div {
        white-space: pre;
    }

    h2 {
        margin: 16px 0;
        font-size: 140%;
    }
}

#user_avatar {
    @apply block w-full text-sm rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent dark:border-gray-600 dark:placeholder-gray-400;
}

button {
    @apply focus:ring-4 focus:ring-blue-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800;
}

.msg {
    border: thin double black;
    @apply my-6 mx-4 p-4;
}
form {
    @apply my-4;
}

textarea, input {
    max-width: 50%;
}

input[type="file"]::file-selector-button, button {
    background: #374151;
    color: #fff;
    font-size: .875rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
}

input[type="file"]::file-selector-button {
    -webkit-margin-start: -1rem;
    -webkit-margin-end: 1rem;
    margin-inline-end: 1rem;
    margin-inline-start: -1rem;
    padding: .625rem 1rem .625rem 2rem;
    border: none;
}

@variants dark {
    input[type="file"]::file-selector-button, button {
        background: #4b5563;
        color: #fff;
    }
}
</style>
