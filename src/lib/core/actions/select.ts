import type { Cheerio, CheerioAPI } from 'cheerio';
import { create_action } from '../chain';
import { isCheerio, isCheerioAPI } from '../util';

export const select = create_action({
    type: 'select',
    run(doc: CheerioAPI, value: unknown, selector: string): Cheerio<Element>[] {
        if (Array.isArray(value)) {
            console.warn('The \'select\' action does not support array values');
        }

        let elements = [];

        if (isCheerio(value)) {
            elements = value.find(selector).toArray();
        } else if (isCheerioAPI(value)) {
            elements = value(selector).toArray();
        } else {
            elements = doc(selector).toArray();
        }

        if (elements.length === 0) {
            throw new Error('No elements found');
        }

        return elements.map((element) => doc(element) as unknown as Cheerio<Element>);
    },
});
