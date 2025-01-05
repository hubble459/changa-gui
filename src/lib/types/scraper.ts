import { Chainy } from 'chainy';
import type { Cheerio, CheerioAPI } from 'cheerio';

export type Scraper = {
    name: string,
    hostnames: string[],
    chains: Chains,
};

export interface Chains {
    manga: {
        accepts: Chainy<CheerioAPI, unknown>;

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
        accepts: Chainy<CheerioAPI, unknown>;

        root: Chainy<CheerioAPI, Cheerio<Element>[], unknown, true | false>;
        url: Chainy<CheerioAPI, string>;
        title: Chainy<CheerioAPI, string>;
        number: Chainy<CheerioAPI, number>;
        cover_url?: Chainy<CheerioAPI, string>;
        date?: Chainy<CheerioAPI, Date>;
    };

    images: {
        accepts: Chainy<CheerioAPI, unknown>;
        urls: Chainy<CheerioAPI, string[], unknown, true | false>,
    };
}
