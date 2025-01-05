import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import * as database from '$lib/server/database';

export const GET = (async () => {
    return json(database.caches(), { status: 200 });
}) satisfies RequestHandler;
