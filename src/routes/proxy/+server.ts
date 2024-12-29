import { json } from '@sveltejs/kit';

export async function GET({ request }) {
    const data = await request.formData();
    const url = data.get('url');

    if (typeof url !== 'string') {
        return json({
            status: 422,
            body: {
                error: 'URL not provided'
            }
        });
    }

    try {
        const html = await fetch(url).then((res) => res.text());
        return json({html});
    } catch (error) {
        return json({
            error: 'Failed to parse URL',
            message: error instanceof Error ? error.message : 'Unknown error',
        }, {
            status: 500,
        });
    }
}
