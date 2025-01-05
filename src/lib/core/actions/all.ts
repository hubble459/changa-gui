import { create_action, type ChainBuilder } from '../chain';
import { actions, type Actions } from '.';
import type { CheerioAPI } from 'cheerio';

export const all = create_action({
    type: 'all',
    async run(doc: CheerioAPI, value: unknown, chains: ChainBuilder<any>[]): Promise<unknown> {
        for (const chain of chains) {
            const action = actions[chain.type as keyof Actions];
            if (!action) {
                throw new Error(`Action with type '${chain.type}' not found`);
            }

            value = await action.run(doc, value, ...chain.items as any);
        }

        return value;
    },
});
