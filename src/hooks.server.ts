import type { Handle, HandleFetch } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import * as database from '$lib/server/database';

const handleParaglide: Handle = i18n.handle();
export const handle: Handle = handleParaglide;

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
    const cached = database.cache.get(database.cache.hash(request.url));

    if (cached) {
        console.debug('[fetch] returning from cache');
        return new Response(cached.html, { status: 200 });
    }

    const response = await fetch(request);
    console.debug('[fetch] fetching from web');

    if (response.ok) {
        console.debug('[fetch] saving to cache');
        database.cache.add({
            url: request.url,
            html: await response.text(),
        });
    }

    return response;
};