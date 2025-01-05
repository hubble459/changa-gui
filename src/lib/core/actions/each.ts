import type { CheerioAPI } from 'cheerio';
import { create_action, type ChainBuilder } from '../chain';
import { actions, type Actions } from '.';

export const each = create_action({
    type: 'each',
    run(doc: CheerioAPI, value: unknown, action: ChainBuilder<any>): Promise<unknown[]> {
        if (!Array.isArray(value)) {
            throw new Error(`Expected an array but got ${typeof value}`);
        }

        const runnable_action = actions[action.type as keyof Actions];
        if (!runnable_action) {
            throw new Error(`Action with type '${action.type}' not found`);
        }

        return Promise.all(value.map((v) => (runnable_action as any).run(doc, v, ...action.items)));
    },
});
