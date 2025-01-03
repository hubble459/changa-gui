import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { load as cheerio } from 'cheerio';
import {configs} from '$lib/server/database';
import * as devalue from 'devalue';
import { ScraperStringifyDevalue } from '$lib/types/scraper';

function getScrapers(html: string, url: string) {
    const doc = cheerio(html, {baseURI: url});
    return Object.fromEntries(
        Object.values(configs())
            .filter((config) => config.hostnames.filter(hostname => url.includes(hostname)).length || !!config.chains.accepts.run(doc))
            .map((config) => [config.name, devalue.stringify(config, ScraperStringifyDevalue)])
    );
}

export const load: PageServerLoad = async ({ fetch, url }) => {
    const target_url = url.searchParams.get('url');

    if (!target_url) {
        return error(400, 'Missing url query parameter');
    }

    const root = path.resolve(import.meta.dirname + '/../../..');

    const md5_url = createHash('md5').update(target_url).digest('hex');
    const md5_url_path = path.join(root, `static/cache/${md5_url}`);

    if (fs.existsSync(md5_url_path)) {
        console.log('Found in cache');

        const stats = fs.statSync(md5_url_path);
        if (Date.now() - stats.mtimeMs > 1000 * 60 * 60 * 24 * 7 /* 1 week */) {
            console.log('Cache expired');

            fs.unlinkSync(md5_url_path);
        } else {
            console.log('Returning from cache');

            const data = JSON.parse(fs.readFileSync(md5_url_path, 'utf-8'));
            return {
                url: target_url,
                html: data.html as string,
                scrapers: getScrapers(data.html, target_url),
            };
        }
    }

    console.log('Fetching', target_url);
    
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
    console.log('Returning from fetch');

    fs.writeFileSync(md5_url_path, JSON.stringify({ html, url: target_url }));

    return {
        html,
        url: target_url,
        scrapers: getScrapers(html, target_url),
    };
};