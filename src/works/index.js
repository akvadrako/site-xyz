
export function load_work(slug) {
    return import(`./${slug}.mdx`);
}
