import type { CheerioAPI } from 'cheerio';
import { create_action } from '../util';

export const cast_int = create_action({
    type: 'cast_int',
    run(_doc: CheerioAPI, value: unknown, radix?: number): number {
        if (typeof value !== 'string') {
            throw new Error(`Expected type string, but got ${typeof value}`);
        }

        if (!/\d/g.test(value)) {
            throw new Error('Value does not contain a number');
        }

        return parseInt(value, radix);
    },
});
