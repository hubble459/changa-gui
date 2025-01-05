import type { PageServerLoad } from './$types';
import * as database from '$lib/server/database';
import type { BuildScraper } from './+page.svelte';
import type { Scraper } from '$lib/types/scraper';
import { Chainy } from 'chainy';

export const load: PageServerLoad = async ({ url, params, fetch }) => {
    const target_url = url.searchParams.get('url') as string;

    const uuid = params.uuid;
    const caches = database.cache.index();

    const scraper: Scraper = database.scraper.get(uuid) ?? {
        name: uuid,
        hostnames: [],
        chains: {
            manga: {
                accepts: new Chainy(),
            },
            search: {},
            chapters: {},
            images: {},
        },
    } satisfies Scraper;

    const build_scraper: BuildScraper = scraper as any;
    build_scraper.url ??= target_url;

    return {
        uuid,
        caches,
        scraper: build_scraper,
        html: build_scraper.url ? await fetch(build_scraper.url).then(r => r.text()) : undefined,
    };
};