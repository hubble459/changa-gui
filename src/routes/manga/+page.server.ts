import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return error(400, 'Missing url query parameter');
    }

    console.log('Fetching', targetUrl);
    
    const response = await fetch(targetUrl, {
        method: 'GET',
        referrer: targetUrl,
        headers: {
            'Content-Type': 'text/html',
            'Origin': targetUrl,
        },
    });

    if (!response.ok) {
        return error(response.status, 'Failed to fetch the HTML content');
    }

    const html = await response.text();
    console.log('Returning from fetch');
    
    return {
        html,
        url: targetUrl,
    };
};