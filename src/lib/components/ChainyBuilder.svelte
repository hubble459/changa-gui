<script lang="ts">
    import { Chainy } from 'chainy';
    import ChainyAction from './ChainyAction.svelte';
 
    const items = $state<Chainy['items']>([]);

    function addAction(index?: number) {
        if (typeof index === 'number') {
            items.splice(index + 1, 0, {action: 'select', options: []});            
        } else {
            items.push({action: 'select', options: []});
        }
    }

    function removeAction(index: number) {
        items.splice(index, 1);
    }
</script>

<h1>Chainy Builder</h1>

<div class="actions">
    {#each items as _, index}
        <ChainyAction action={items[index]} remove={() => removeAction(index)} />
        {#if index < items.length - 1}
            <button class="action-add mb-4" onclick={() => addAction(index)}>+</button>
        {/if}
    {/each}

    <button class="action-add" onclick={() => addAction()}>+</button>
</div>

<style>
    .actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 16px;
        position: relative;
    }
    .actions::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: #000;
        margin-top: 16px;
    }
    .action-add {
        z-index: 1;
        --size: 2em;
        width: var(--size);
        height: var(--size);
        background-color: bisque;
        border-radius: 50%;
    }
</style>