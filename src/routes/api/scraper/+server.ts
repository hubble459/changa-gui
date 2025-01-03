import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import * as database from '$lib/server/database';

export const GET = (async () => {
    const config_names = Object.fromEntries(Object.entries(database.configs()).map(([key, value]) => [value.name, key]));

    return json(config_names, { status: 200 });
}) satisfies RequestHandler;

export const POST = (async ({request}) => {
    const data = await request.json();
    database.save_config(data);
    return new Response(null, { status: 204 });
}) satisfies RequestHandler;
