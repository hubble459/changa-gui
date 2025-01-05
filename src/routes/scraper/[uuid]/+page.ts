import { configs } from '$lib/server/database';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const config = configs()[params.uuid];

    return {
        scraper: config,
    };
};