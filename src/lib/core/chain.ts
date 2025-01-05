import type { CheerioAPI } from 'cheerio';
import { actions, type Actions } from './actions';

type MaybePromise<T> = T | Promise<T>;

export type Action<Type extends string, Items extends readonly unknown[], Return = unknown> = {
    type: Type
    run: (doc: CheerioAPI, value: unknown, ...items: Items) => MaybePromise<Return>
};

type ActionItems<A extends Action<keyof Actions, any>> = A['run'] extends (doc: CheerioAPI, value: unknown, ...items: infer Items) => any ? Items : never;

export type ChainBuilder<K extends keyof Actions = keyof Actions> = {
    type: K
    items: ActionItems<Actions[K]>
};

export function action<K extends keyof Actions>(type: K, ...items: ActionItems<Actions[K]>): ChainBuilder<K> {
    return { type, items };
}

export function run_action<K extends keyof Actions>(action: ChainBuilder<K>, doc: CheerioAPI, value: unknown): MaybePromise<unknown> {
    const runnable_action = actions[action.type];
    if (!runnable_action) {
        throw new Error(`Action with type '${action.type}' not found`);
    }

    return (runnable_action as any).run(doc, value, ...action.items);
}
