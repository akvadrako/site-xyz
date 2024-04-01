/**
 * Generate list of works
 *
 * FIXME: support language, rename to works.json
 */

import {listDocs, loadDoc} from '$lib/docs'
import {log} from '$lib'
import { json } from '@sveltejs/kit';

export const prerender = true

export async function GET({ setHeaders }) {
    setHeaders({
        "cache-control": "max-age=3600",
    });

    let slugs = listDocs('works')

    let works = []
    for(let slug of slugs) {
        let doc = await loadDoc(slug)
        works.push({
            title_nl: doc.title_nl,
            title_en: doc.title_en,
            image: doc.image,
            kind: doc.kind,
            path: doc.path,
            slug: doc.slug,
        })
    }

    return json({
        works: works,
    })
}
