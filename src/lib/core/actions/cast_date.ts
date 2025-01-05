import type { CheerioAPI } from 'cheerio';
import { create_action } from '../util';
import { parse, type Locale } from 'date-fns';

/**
 * https://date-fns.org/v4.1.0/docs/parse
 */
export const cast_date = create_action({
    type: 'cast_date',
    run(_doc: CheerioAPI, value: unknown, format: string = 'MM/dd/yyyy', reference_date: Date = new Date(), locale?: Locale): Date {
        if (typeof value !== 'string') {
            throw new Error(`Expected type string, but got ${typeof value}`);
        }

        const date = parse(value, format, reference_date, { locale });

        if (isNaN(date.valueOf())) {
            throw new Error('Not a valid date');
        }

        return date;
    },
});
