import { create_action, type ChainBuilder } from '../chain';
import { actions, type Actions } from '.';
import type { CheerioAPI } from 'cheerio';

export const any = create_action({
    type: 'any',
    async run(doc: CheerioAPI, value: unknown, chains: ChainBuilder<any>[], fail: boolean = true): Promise<unknown> {
        for (const chain of chains) {
            const action = actions[chain.type as keyof Actions];
            if (!action) {
                throw new Error(`Action with type '${chain.type}' not found`);
            }

            try {
                return await action.run(doc, value, ...chain.items as any);
            } catch {
                // ignored
            }
        }

        if (fail) {
            throw new Error('No action passed in this \'any\' action');
        }

        return value;
    },
});
