import * as database from '$lib/server/database';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    return {
        scraper: database.scraper.get(params.uuid),
    };
};
