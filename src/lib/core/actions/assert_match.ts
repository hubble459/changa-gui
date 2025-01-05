import type { CheerioAPI } from 'cheerio';
import { create_action } from '../chain';

export const assert_match = create_action({
    type: 'assert_match',
    run(_doc: CheerioAPI, value: unknown, regex: RegExp): unknown {
        if (typeof value !== 'string') {
            throw new Error(`Expected value to be of type string, got ${typeof value}`);
        }

        if (!regex.test(value)) {
            throw new Error('Value does not match regex');
        }

        return value;
    },
});
