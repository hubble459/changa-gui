import type { CheerioAPI } from 'cheerio';
import { create_action } from '../util';

export const join = create_action({
    type: 'join',
    run(_doc: CheerioAPI, value: unknown, ...options: Parameters<Array<string>['join']>): string {
        if (!Array.isArray(value)) {
            throw new Error(`Expected an array but got ${typeof value}`);
        }

        return value.join(...options);
    },
});
