import { browser } from '$app/environment';
import { i18n } from '$lib/i18n';
import { ScraperParseDevalue, ScraperStringifyDevalue } from '$lib/transport';
import type { ServerInit, Transport } from '@sveltejs/kit';
import { html_axios } from 'chainy';
export const reroute = i18n.reroute();

export const transport: Transport = {
    Chainy: {
        encode: ScraperStringifyDevalue.Chainy,
        decode: ScraperParseDevalue.Chainy,
    }
};

export const init: ServerInit = async () => {
    if (browser) {
        html_axios.defaults.transformRequest = function () {
            this.url = '/api/proxy?url=' + this.url?.toString();
        };
    }
};
