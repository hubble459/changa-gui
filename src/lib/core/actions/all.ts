import { run_action, type ChainBuilder } from '../chain';
import type { CheerioAPI } from 'cheerio';
import { create_action } from '../util';

export const all = create_action({
    type: 'all',
    async run(doc: CheerioAPI, value: unknown, chains: ChainBuilder<any>[]): Promise<unknown> {
        for (const chain of chains) {
            value = await run_action(chain, doc, value);
        }

        return value;
    },
});
