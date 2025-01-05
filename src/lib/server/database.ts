import fs from 'node:fs';
import path from 'node:path';
import * as devalue from 'devalue';
import { type Scraper } from '$lib/types/scraper';
import { randomUUID, createHash } from 'node:crypto';

const root = path.resolve(import.meta.dirname + '/../../..');

export const config_dir = path.join(root, 'static/config');
export const cache_dir = path.join(root, 'static/cache');

export const scraper = {
    index(): Record<string, Scraper> {
        const config_dir_files = fs.readdirSync(config_dir);

        const configs: Record<string, Scraper> = {};
        for (const config_file of config_dir_files) {
            const uuid = config_file.slice(0, -5);
            const scraper = this.get(uuid);
            if (scraper) {
                configs[uuid] = scraper;
            }
        }

        return configs;
    },
    get(uuid: string): Scraper | undefined {
        const file_path = path.join(cache_dir, `${uuid}.json`);

        if (!fs.existsSync(file_path)) {
            return undefined;
        }

        return devalue.parse(fs.readFileSync(file_path, 'utf-8'));
    },
    update(uuid: string, config: Scraper): void {
        const file_path = path.join(config_dir, `${uuid}.json`);

        fs.writeFileSync(file_path, devalue.stringify(config));
    },
    add(config: Scraper): string {
        const uuid = randomUUID();

        this.update(uuid, config);

        return uuid;
    },
};

export type CacheData = { url: string, html: string };
export const cache = {
    index(): Record<string, string> {
        const cache_dir_files = fs.readdirSync(cache_dir);

        const caches: Record<string, string> = {};

        for (const cache_file of cache_dir_files) {
            const cached = this.get(cache_file);
            if (cached) {
                caches[cache_file] = cached.url;
            }
        }

        return caches;
    },
    hash(url: string): string {
        return createHash('md5').update(url).digest('hex');
    },
    get(hash: string): CacheData | undefined {
        const cache_path = path.join(cache_dir, hash);

        if (!fs.existsSync(cache_path)) {
            return undefined;
        }

        const stats = fs.statSync(cache_path);
        if (Date.now() - stats.mtimeMs > 1000 * 60 * 60 * 24 * 7 /* 1 week */) {
            fs.unlinkSync(cache_path);
        } else {
            return JSON.parse(fs.readFileSync(cache_path, 'utf-8'));
        }

        return undefined;
    },
    update(data: CacheData): string {
        const hash = this.hash(data.url);
        const cache_path = path.join(cache_dir, hash);

        fs.writeFileSync(cache_path, JSON.stringify(data));

        return hash;
    },
    add(data: CacheData): string {
        return this.update(data);
    },
};
