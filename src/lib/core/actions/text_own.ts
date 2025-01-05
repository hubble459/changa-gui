import type { CheerioAPI } from 'cheerio';
import { create_action } from '../chain';
import { isCheerio, ownText } from '../util';

export const text_own = create_action({
    type: 'text_own',
    run(_doc: CheerioAPI, value: unknown): string {
        if (Array.isArray(value)) {
            throw new Error('Can\'t get text from an array');
        }

        switch (typeof value) {
            case 'string':
                return value;

            case 'bigint':
            case 'symbol':
            case 'number':
                return value.toString();

            case 'boolean':
                return (value ? 'true' : 'false');

            case 'object':
            case 'function':
                if (isCheerio(value)) {
                    return ownText(value);
                }

                break;

            default:
                break;
        }

        throw new Error(`Can't get text from ${typeof value}`);
    },
});
