<script lang="ts">
	import type { PageData } from './$types';

    let { data: scrapers }: { data: PageData } = $props();
</script>

<h1>changa</h1>

<form method="GET" action="/manga">
    <input name="url" type="url" placeholder="url">
    <button>parse!</button>
</form>

<div>
    <table>
        <tbody>
            <tr>
                <th>scraper</th>
            </tr>
        {#each Object.entries(scrapers) as [scraper, url]}
            <tr>
                <td><a aria-label="scraper-page" href="/scraper/{url.slice(8, -5)}">{scraper}</a></td>
            </tr>
        {:else}
            <tr><td>Loading...</td></tr>
        {/each}
        </tbody>
    </table>
</div>

<style>
    th, td {
        padding: 0em 1em;
    }

    
</style>
