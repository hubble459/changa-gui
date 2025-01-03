import { Chainy } from 'chainy';
import type { Cheerio, CheerioAPI } from 'cheerio';

export const ScraperParseDevalue = {
    Chainy: (value: any) => {
        const chain = new Chainy(value.type);
        chain.items.push(...value.items);
        return chain;
    }
};

export const ScraperStringifyDevalue = {
    // @ts-expect-error `type` field in Chainy is private
    Chainy: (value: unknown) => value instanceof Chainy && {type: value.type, items: value.items},
};

export type Scraper = {
    name: string,
    hostnames: string[],
    chains: Chains,
};

export interface Chains {
    accepts: Chainy<CheerioAPI, unknown>;
    manga: {
        url?: Chainy<CheerioAPI, string>;
        title: Chainy<CheerioAPI, string>;
        description: Chainy<CheerioAPI, string>;
        cover_url?: Chainy<CheerioAPI, string>;
        status?: Chainy<CheerioAPI, string>;
        is_ongoing?: Chainy<CheerioAPI, boolean>;
        authors?: Chainy<CheerioAPI, string[]>;
        genres?: Chainy<CheerioAPI, string[]>;
        alternative_titles?: Chainy<CheerioAPI, string[]>;
    };

    search?: {
        search_urls: string[];
        format_keyword: Chainy<string, string>;

        root: Chainy<CheerioAPI, Cheerio<Element>[]>;
        url: Chainy<CheerioAPI, string>;
        title: Chainy<CheerioAPI, string>;
        description?: Chainy<CheerioAPI, string>;
        cover_url?: Chainy<CheerioAPI, string>;
        status?: Chainy<CheerioAPI, string>;
        is_ongoing?: Chainy<CheerioAPI, boolean>;
        authors?: Chainy<CheerioAPI, string[]>;
        genres?: Chainy<CheerioAPI, string[]>;
        alternative_titles?: Chainy<CheerioAPI, string[]>;
    };

    chapters: {
        root: Chainy<CheerioAPI, Cheerio<Element>[], unknown, true | false>;
        url: Chainy<CheerioAPI, string>;
        title: Chainy<CheerioAPI, string>;
        number: Chainy<CheerioAPI, number>;
        cover_url?: Chainy<CheerioAPI, string>;
        date?: Chainy<CheerioAPI, Date>;
    };

    images: Chainy<CheerioAPI, string[], unknown, true | false>;
}
