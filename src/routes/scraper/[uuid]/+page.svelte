<script lang="ts">
    import { ScraperParseDevalue, type Scraper } from '$lib/types/scraper';
	import type { PageData } from './$types';
    import * as devalue from 'devalue';

    let { data }: { data: PageData } = $props();

    console.log(data.stringified_scraper);
    
    const scraper = devalue.parse(data.stringified_scraper, ScraperParseDevalue) as Scraper;
</script>

<h1>scraper</h1>
<div>{scraper.name}</div>
<div>{scraper.hostnames}</div>
<div>{scraper.chains.manga.authors?.add('trim')}</div>

