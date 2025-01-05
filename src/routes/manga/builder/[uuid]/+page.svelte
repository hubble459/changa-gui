<script lang="ts" module>
    import type { Chains, Scraper } from '$lib/types/scraper';
    
    export type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };
    export type BuildScraper = Scraper & {
        url: string,
    };
</script>

<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import Tabs from '$lib/components/Tabs.svelte';
    import * as devalue from 'devalue';
    import { ScraperParseDevalue, ScraperStringifyDevalue } from '$lib/transport';
    import { proxy_fetch } from '$lib/client/proxy_fetch';
    import * as cheerio from 'cheerio';
    import ChainyBuilder from '$lib/components/ChainyBuilder.svelte';
    import { Chainy } from 'chainy';
    import { writable } from 'svelte/store';

    let { data }: { data: PageData } = $props();
    
    let new_url: string = $state('');
    // let config: BuildScraper = $state(data.scraper);
    const config = writable(data.scraper);

    let html = $state('');
    let doc = $derived(cheerio.load(html, {baseURI: $config.url}));

    $effect(() => {
        if ($config.url) {
            console.log('owo');
            
            localStorage.setItem(data.uuid, devalue.stringify($config, ScraperStringifyDevalue));
        }
    });

    $effect(() => {
        if ($config.url) {
            console.log('changed');
            
            (async (url: string) => {
                const html = await proxy_fetch(url).then(r => r.text());
                console.log(html);
            })($config.url);
        }
    });

    onMount(async () => {
        const stored_scraper = localStorage.getItem(data.uuid);
        if (!stored_scraper) {
            localStorage.setItem(data.uuid, devalue.stringify(config, ScraperStringifyDevalue));
        } else {
            $config = devalue.parse(stored_scraper, ScraperParseDevalue);
        }
    });

    function addUrl(event: SubmitEvent) {
        event.preventDefault();

        if (!new_url) {
            (event.target as HTMLFormElement).checkValidity();
        }

        const html = '';

        console.log(new_url);
        
    }
</script>

<h1>Scraper Builder</h1>

<div class="flex flex-row w-full gap-x-4">
    <div class="w-1/3">
        <h2>websites</h2>

        <form class="grid grid-cols-5" onsubmit={addUrl}>
            <input class="col-span-4" required bind:value={new_url} type="url" name="url" id="url" placeholder="new url">
            <button type="submit">add</button>
        </form>

        <ul class="url-list">
            {#each Object.values(data.caches) as cached_url}
                <li>
                    <input type="radio" id={cached_url} name="url" value={cached_url} bind:group={$config.url}>
                    <label title={cached_url} for={cached_url}>{cached_url}</label>
                </li>
            {/each}
        </ul>
    </div>

    <Tabs labels={['manga', 'chapters', 'images', 'search'] as const}>
        {#snippet tab(name)}
            {#if name === 'manga'}
                <Tabs labels={['accepts', 'title', 'description'] as const}>
                    {#snippet tab(field)}
                        <h5>{field}</h5>
                        <p>{$config.chains[name][field].items.length}</p>
                        <ChainyBuilder bind:items={$config.chains[name][field].items}></ChainyBuilder>
                    {/snippet}
                </Tabs>
            {:else}
                <h5>{name}</h5>
            {/if}
          
        {/snippet}
    </Tabs>

</div>

<style>
    .url-list li {
        display: flex;
        column-gap: 0.5em;
        align-items: center;
    }

    .url-list li label {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>