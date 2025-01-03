import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const config_path = `/config/${params.uuid}.json`;

    return {
        stringified_scraper: await fetch(config_path).then((res) => res.text()),
    };
};