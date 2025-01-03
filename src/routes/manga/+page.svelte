<script lang='ts'>
    import type { PageData } from './$types';
    import { load } from 'cheerio';
    import Tabs from '$lib/components/Tabs.svelte';
    import Manga from '$lib/components/Manga.svelte';
    import * as devalue from 'devalue';
    import { ScraperParseDevalue, type Scraper } from '$lib/types/scraper';

    let { data }: { data: PageData } = $props();

    let doc = load(data.html, { baseURI: data.url });

    function parseScraper(scraper: string): Scraper {
        return devalue.parse(scraper, ScraperParseDevalue);
    }
</script>

<h1>Manga Details</h1>
<small>{data.url}</small>

<hr>

<Tabs labels={Object.keys(data.scrapers)}>
    {#snippet tab(scraper)}
        <Manga url={data.url} {doc} scraper={parseScraper(data.scrapers[scraper])} />
    {/snippet}
</Tabs>
