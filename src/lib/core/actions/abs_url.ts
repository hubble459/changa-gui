import type { CheerioAPI } from 'cheerio';
import { create_action } from '../chain';

export const abs_url = create_action({
    type: 'abs_url',
    run(doc: CheerioAPI, value: unknown, base_uri?: string): string {
        if (typeof value !== 'string') {
            throw new Error(`Expected a string but got ${typeof value}`);
        }

        if (value.includes('://')) {
            return value;
        }

        base_uri ??= doc._options.baseURI?.toString();

        return new URL(value, base_uri).href;
    },
});
