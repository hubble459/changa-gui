<script lang="ts">
    import { actions, type Actions } from 'chainy';
    import ChainyAction, { type Action } from './ChainyAction.svelte';
    import Modal from './Modal.svelte';

    interface Props {
        items?: Action[];
    }
    
    const { items = $bindable([]) }: Props = $props();
 
    let createAction = $state(false);
    let createAtIndex = $state<number | undefined>();

    function openActionsModal(index?: number) {
        createAction = true;
        createAtIndex = index;
    }

    function addAction(action: keyof Actions | 'group') {
        let item = action === 'group' ? {type: 'and', items: []} : {action, options: []};

         if (typeof createAtIndex === 'number') {
            items.splice(createAtIndex + 1, 0, item);            
        } else {
            items.push(item);
        }
    }

    function removeAction(index: number) {
        items.splice(index, 1);
    }
</script>

<div class="actions">
    {#each items as _, index}
        <ChainyAction bind:action={items[index]} remove={() => removeAction(index)} />
        {#if index < items.length - 1}
            <button class="action-add mb-4" onclick={() => openActionsModal(index)}>+</button>
        {/if}
    {/each}

    <button class="action-add" onclick={() => openActionsModal()}>+</button>
</div>

<Modal id="actions" bind:visible={createAction}>
    <h2>Actions</h2>

    <div class="w-[30vw] flex flex-row flex-wrap gap-x-4 gap-y-2">
        {#each Object.keys(actions) as action}
            <button
                class="action-option"
                onclick={() => addAction(action as keyof Actions)}>{action}</button>
        {/each}

        <button class="action-option" onclick={() => addAction('group')}>group</button>
    </div>
</Modal>

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
    .action-option {
        background-color: #f0f0f0;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
    }
</style>