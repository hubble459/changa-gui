import type { CheerioAPI } from 'cheerio';
import { create_action } from '../util';
import * as date_fns from 'date-fns';
// @ts-expect-error bitch-ass package doesn't have types https://www.npmjs.com/package/parse-human-relative-time
import parse_human from 'parse-human-relative-time/date-fns';
const parse = parse_human(date_fns);

export const cast_date_relative = create_action({
    type: 'cast_date_relative',
    run(_doc: CheerioAPI, value: unknown): Date {
        if (typeof value !== 'string') {
            throw new Error(`Expected type string, but got ${typeof value}`);
        }

        const now = new Date();

        if (/now|hot|latest|just|a few/gi.test(value)) {
            return now;
        }

        const date = parse(value, now);

        if (isNaN(date.valueOf())) {
            throw new Error('Not a valid date');
        }

        return date;
    },
});
