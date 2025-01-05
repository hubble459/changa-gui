<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    console.log(data.scraper);
</script>

<h1>scraper</h1>
<div>{data.scraper.name}</div>
<div>{data.scraper.hostnames}</div>
<div>{data.scraper.chains.manga.authors?.add('trim')}</div>
