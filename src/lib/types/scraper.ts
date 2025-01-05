import type { ChainBuilder } from '$lib/core/chain';

export type Scraper = {
    name: string
    hostnames: string[]
    chains: Chains
};

export interface Chains {
    manga: {
        accepts: ChainBuilder

        url?: ChainBuilder
        title: ChainBuilder
        description: ChainBuilder
        cover_url?: ChainBuilder
        status?: ChainBuilder
        is_ongoing?: ChainBuilder
        authors?: ChainBuilder
        genres?: ChainBuilder
        alternative_titles?: ChainBuilder
    }

    search?: {
        search_urls: string[]
        format_keyword: ChainBuilder

        root: ChainBuilder
        url: ChainBuilder
        title: ChainBuilder
        description?: ChainBuilder
        cover_url?: ChainBuilder
        status?: ChainBuilder
        is_ongoing?: ChainBuilder
        authors?: ChainBuilder
        genres?: ChainBuilder
        alternative_titles?: ChainBuilder
    }

    chapters: {
        accepts: ChainBuilder

        root: ChainBuilder
        url: ChainBuilder
        title: ChainBuilder
        number: ChainBuilder
        cover_url?: ChainBuilder
        date?: ChainBuilder
    }

    images: {
        accepts: ChainBuilder
        urls: ChainBuilder
    }
}
