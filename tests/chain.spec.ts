import { action, run_action } from '$lib/core/chain';
import { describe, test, expect } from 'vitest';
import * as cheerio from 'cheerio';
import fs from 'node:fs';

describe('chain', () => {
    const cached_file = fs.readFileSync('static/cache/125cd73ad2cfd43a9ea91cecc1c9ff10', 'utf-8');
    const cached_json = JSON.parse(cached_file);
    const doc = cheerio.load(cached_json.html, { baseURI: cached_json.url });

    test('all', async () => {
        const chain = action('all', [
            action('select', 'h1'),
            action('first'),
            action('text_own'),
        ]);
        const result = await run_action(chain, doc, undefined);
        expect(result).toBe('Hamburger Are My Favorite');
    });
});
