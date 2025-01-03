import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    return (await fetch('/api/scraper').then((res) => res.json())) as Record<string, string>;
};