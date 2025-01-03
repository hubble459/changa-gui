import fs from 'node:fs';
import path from 'node:path';
import * as devalue from 'devalue';
import { ScraperParseDevalue, ScraperStringifyDevalue, type Scraper } from '$lib/types/scraper';
import { randomUUID } from 'node:crypto';

const root = path.resolve(import.meta.dirname + '/../../..');
const config_dir = path.join(root, 'static/config');

export function configs() {
    const config_dir_files = fs.readdirSync(config_dir);

    const configs: Record<string, Scraper> = {};
    for (const config_file of config_dir_files) {
        const config_path = path.join(config_dir, config_file);
        const config = devalue.parse(fs.readFileSync(config_path, 'utf-8'), ScraperParseDevalue);
        configs[`/config/${config_file}`] = config;
    }

    return configs;
}

export function save_config(config: Scraper) {
    const uuid = randomUUID();
    const config_path = path.join(config_dir, `${uuid}.json`);
    fs.writeFileSync(config_path, devalue.stringify(config, ScraperStringifyDevalue));
}