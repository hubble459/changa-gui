<script lang="ts">
    import { run_action, type ChainBuilder } from '$lib/core/chain';
    import type { Scraper } from '$lib/types/scraper';
    import type { Cheerio, CheerioAPI } from 'cheerio';

    type Props = {
        url: string
        doc: CheerioAPI
        scraper: Scraper
    };

    let { doc, scraper }: Props = $props();
    let chapter_root = $state<Cheerio<Element>[]>();

    async function value(chain: ChainBuilder, value?: CheerioAPI | Cheerio<Element>): Promise<{ error: boolean, value: string }> {
        try {
            let v = await run_action(chain, doc, value);

            if (v instanceof Date) {
                v = v.toISOString();
            } else if (Array.isArray(v)) {
                v = v.join(', ');
            } else if (typeof v === 'object') {
                v = JSON.stringify(v);
            } else if (typeof v !== 'string') {
                v = String(v);
            }

            return { error: false, value: v as string };
        } catch (error) {
            console.error(error);

            if (error) {
                if (typeof error === 'object' && 'message' in error) {
                    return { error: true, value: error.message as string };
                }
            }

            return { error: true, value: 'Unknown error' };
        }
    }

    async function loadChapterRoot() {
        chapter_root = await run_action(scraper.chains.chapters.root, doc, undefined) as any;
    }
</script>

<div class="grid grid-cols-7 gap-y-2">
    {#each Object.entries(scraper.chains.manga) as [property, chain]}
        {@const val = await value(chain)}
        <strong class="col-span-2">{property}</strong>
        <p class="col-span-5" class:error={val.error}>{val.value}</p>
    {/each}
</div>

<hr>

{#if chapter_root}
    {#each chapter_root as root_element}
        <div class="grid grid-cols-6 gap-y-2 overflow-hidden max-w-max">
            {#each Object.entries(scraper.chains.chapters) as [property, chain]}
                {#if property !== 'root'}
                    {@const val = value(chain, root_element)}
                    <strong>{property}</strong>
                    <p class="col-span-5" class:error={val.error}>{val.value}</p>
                {/if}
            {/each}
        </div>
        <hr>
    {/each}
{:else}
    <button onclick={loadChapterRoot}>load chapters</button>
{/if}

<style>
    .error {
        color: red;
    }

    p {
        word-break: break-word;
    }
</style>
