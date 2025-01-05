import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { randomUUID } from 'node:crypto';

export const load: PageServerLoad = ({ url }) => {
    const target_url = url.searchParams.get('url');

    if (target_url) {
        const uuid = randomUUID();
        redirect(302, `/manga/builder/${uuid}?url=${target_url}`);
    } else {
        error(422, 'URL parameter is missing');
    }
};