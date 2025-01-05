import type { CheerioAPI } from 'cheerio';
import { create_action } from '../chain';

export const split = create_action({
    type: 'split',
    run(_doc: CheerioAPI, value: unknown, ...options: Parameters<string['split']>): string[] {
        if (typeof value === 'string') {
            return value.split(...options);
        }

        throw new Error(`Can not split '${typeof value}'`);
    },
});
