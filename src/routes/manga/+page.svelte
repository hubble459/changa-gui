<script lang='ts'>
    import type { PageData } from './$types';
    import { load } from 'cheerio';
    import Tabs from '$lib/components/Tabs.svelte';
    import Manga from '$lib/components/Manga.svelte';

    let { data }: { data: PageData } = $props();

    let doc = load(data.html, { baseURI: data.url });
</script>

<h1>Manga Details</h1>
<small>{data.url}</small>

<hr>

<Tabs labels={[...Object.keys(data.scrapers), '+']}>
    {#snippet tab(scraper)}
        {#if scraper === '+'}
            <p>A scraper already exists for this url, are you sure you want to add another?</p>
            <a class="create-scraper" href={`/manga/builder?url=${data.url}`}>Create a new scraper</a>
        {:else}
            <Manga url={data.url} {doc} scraper={data.scrapers[scraper]} />
        {/if}
    {/snippet}
</Tabs>

<style>
    .create-scraper {
        text-align: center;
        display: block;
        margin-top: 1em;
        border-radius: 0.25em;
        padding: 0.5em 1em;
        background-color: #a2cfff;
    }
</style>