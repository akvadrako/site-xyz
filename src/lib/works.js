
export function load_work(slug) {
    return import(`../works/${slug}.mdx`);
}
