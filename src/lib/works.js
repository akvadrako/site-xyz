
export async function load_work(slug) {
    return (await import(`../works/${slug}.mdx`)).default;
}
