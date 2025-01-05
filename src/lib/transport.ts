import { Chainy } from 'chainy';

export const ScraperParseDevalue = {
    Chainy: (value: any) => {
        const chain = new Chainy(value.type);
        chain.items.push(...value.items);
        return chain;
    },
};

export const ScraperStringifyDevalue = {
    // @ts-expect-error `type` field in Chainy is private
    Chainy: (value: unknown) => value instanceof Chainy && {type: value.type, items: value.items},
};