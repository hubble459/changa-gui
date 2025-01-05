import type { CheerioAPI } from 'cheerio';
import { create_action } from '../chain';

export const first = create_action({
    type: 'first',
    run(_doc: CheerioAPI, value: unknown): unknown {
        if (!Array.isArray(value)) {
            throw new Error(`Expected an array but got ${typeof value}`);
        }

        return value[0];
    },
});
