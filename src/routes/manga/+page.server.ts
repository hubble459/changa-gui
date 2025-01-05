import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { load as cheerio } from 'cheerio';
import * as database from '$lib/server/database';

function scrapers(html: string, url: string) {
    const doc = cheerio(html, {baseURI: url});
    return Object.fromEntries(
        Object.values(database.scraper.index())
            .filter((config) => config.hostnames.filter(hostname => url.includes(hostname)).length || !!config.chains.manga.accepts.run(doc))
            .map((config) => [config.name, config])
    );
}

export const load: PageServerLoad = async ({ fetch, url }) => {
    const target_url = url.searchParams.get('url');

    if (!target_url) {
        return error(400, 'Missing url query parameter');
    }

    const response = await fetch(target_url, {
        method: 'GET',
        referrer: target_url,
        headers: {
            'Content-Type': 'text/html',
            'Origin': target_url,
        },
    });

    if (!response.ok) {
        return error(response.status, 'Failed to fetch the HTML content');
    }

    const html = await response.text();

    return {
        html,
        url: target_url,
        scrapers: scrapers(html, target_url),
    };
};