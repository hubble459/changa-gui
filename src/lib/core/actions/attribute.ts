import type { CheerioAPI } from 'cheerio';
import { create_action } from '../util';
import { isCheerio } from '../util';

export const attribute = create_action({
    type: 'attribute',
    run(_doc: CheerioAPI, value: unknown, attributes: string | string[]): string {
        if (!isCheerio(value)) {
            throw new Error(`Expected value to be of type Cheerio, but got ${typeof value}`);
        }

        if (typeof attributes === 'string') {
            attributes = [attributes];
        }

        for (const attr of attributes) {
            const val = value.attr(attr);
            if (val) {
                return val;
            }
        }

        throw new Error('Could not find attribute');
    },
});
