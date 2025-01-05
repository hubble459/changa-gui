import type { CheerioAPI } from 'cheerio';
import { create_action } from '../chain';

export const trim = create_action({
    type: 'trim',
    run(_doc: CheerioAPI, value: unknown): string {
        if (typeof value === 'string') {
            return value.trim();
        }

        throw new Error(`Can not trim '${typeof value}'`);
    },
});
