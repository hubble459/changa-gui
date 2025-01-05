import { json } from '@sveltejs/kit';

export async function GET({ url, fetch }) {
    const target_url = url.searchParams.get('url');

    if (typeof target_url !== 'string') {
        return json({
            status: 422,
            body: {
                error: 'URL not provided'
            }
        });
    }

    return fetch(target_url);
}
