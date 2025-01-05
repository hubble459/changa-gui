import { run_action, type ChainBuilder } from '../chain';
import type { CheerioAPI } from 'cheerio';
import { create_action } from '../util';

export const any = create_action({
    type: 'any',
    async run(doc: CheerioAPI, value: unknown, chains: ChainBuilder<any>[], fail: boolean = true): Promise<unknown> {
        for (const chain of chains) {
            try {
                return await run_action(chain as any, doc, value);
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
