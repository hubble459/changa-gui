<script lang="ts">
    import type { ChainBuilder as ChainBuilderType } from '$lib/core/chain';
    import ChainBuilder from './ChainBuilder.svelte';

    type Props = {
        parent?: ChainBuilderType
        action: ChainBuilderType
        index: number
    };

    let { parent = $bindable(), action = $bindable(), index }: Props = $props();

    function add(items?: ChainBuilderType[]) {
        items ??= parent?.items[0] ?? [] as ChainBuilderType<'all'>['items'][0];

        items.push({ type: 'select', items: ['h1'] } as ChainBuilderType<'select'>);
    }

    function remove() {
        if (parent) {
            const parent_items = parent.items[0] as ChainBuilderType<'all'>['items'][0];
            if (Array.isArray(parent_items)) {
                parent_items.splice(index, 1);
            }
        }
    }
</script>

{#if action.type === 'any' || action.type === 'all'}
    <div class="group">
        <div class="group-header">
            <span>{action.type}</span>
            <button class="move-up">↑</button>
            <button class="move-down">↓</button>
            <button onclick={() => add(action.items[0])} class="add">+</button>
            <button class="delete">x</button>
        </div>
        {#each action.items[0] as _, i}
            {i}
            <ChainBuilder bind:action={action.items[0][i]} bind:parent={action} index={i} />
        {/each}
    </div>
{:else}
    <div class="item">
        <div class="item-header">
            <span>{action.type}</span>
            <button class="move-up">↑</button>
            <button class="move-down">↓</button>
            <button onclick={() => add()} class="add">+</button>
            <button onclick={() => remove()} class="delete">x</button>
        </div>
        {#if action.type === 'select'}
            <label>selector: <input type="text" bind:value={action.items[0]}></label>
        {/if}
    </div>
{/if}

<style>
    .group, .item {
        position: relative;
        padding: 5px;
        border: 1px solid #ccc;
        margin-bottom: 5px;
    }

    .group-header, .item-header {
        display: flex;
        align-items: center;
    }

    .group-header span, .item-header span {
        flex-grow: 1;
    }

    .group-header button, .item-header button {
        margin-left: 5px;
        display: none;
    }

    .group:hover .group-header button, .item:hover .item-header button {
        display: inline-block;
    }

    input {
        line-height: 1em;
        padding: 0;
    }
</style>
