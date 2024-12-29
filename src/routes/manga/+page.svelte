<script lang='ts'>
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { Changa } from 'changa';
    import { load } from 'cheerio';
    import type { Manga } from 'changa/out/type';

    let { data }: { data: PageData } = $props();

    let manga: Manga = $state({});

    onMount(async () => {
        try {
            const changa = new Changa();
            manga = changa.manga(load(data.html, { baseURI: data.url }));
            console.log(manga);
            
        } catch (error) {
            console.error('Error fetching manga data:', error);
        }
    });
</script>

<h1>Manga Details</h1>

{#if manga.title}
    <div class="manga">
        <img src="{manga.cover_url}" alt="">
        <table>
            <tbody>
                {#each Object.entries(manga) as [key, value]}
                <tr>
                    <th>{key}:</th>
                    <td>{Array.isArray(value) ? value.join(', ') : value}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
{:else}
    <p>Loading...</p>
{/if}

<style>
    .manga {
        display: flex;
        gap: 1rem;
    }

    .manga img {
        width: 200px;
        height: 300px;
        object-fit: cover;
    }

    .manga th {
        text-align: right;
        vertical-align: top;
        padding-right: 1em;
    }
</style>