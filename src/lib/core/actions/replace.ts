import type { CheerioAPI } from 'cheerio';
import { create_action } from '../util';

export const replace = create_action({
    type: 'replace',
    run(_doc: CheerioAPI, value: unknown, ...options: Parameters<string['replace']>): string {
        if (typeof value !== 'string') {
            throw new Error(`Expected value to be of type string, got ${typeof value}`);
        }

        return value.replace(...options);
    },
});
