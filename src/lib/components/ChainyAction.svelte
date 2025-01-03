<script lang="ts" module>
    import type { Actions } from 'chainy';

    export type Action = ({action: keyof Actions, options: unknown[]} | {type: Chainy['type'], items: Action[]});
</script>

<script lang="ts">
    import { Chainy } from 'chainy';
    import ChainyBuilder from './ChainyBuilder.svelte';

    interface Props {
        action: Action;
        remove: () => void;
    }

    const {action = $bindable(), remove}: Props = $props();

    function toggleGroup() {
        if ('type' in action) {
            action.type = action.type === 'and' ? 'or' : 'and';
        }
    }
</script>

{#if action instanceof Chainy}
    <p>meow</p>
{:else if 'type' in action}
    <div class="nested-builder">
        <button onclick={() => toggleGroup()}>{action.type}</button>
        <ChainyBuilder bind:items={action.items} />
        <button class="remove" onclick={remove}>-</button>
    </div>
{:else}
    <div class="action">
        <p>{action.action}</p>
        {#if ['select', 'attribute', 'matches', 'value', 'regex'].includes(action.action)}
            <input bind:value={action.options[0]} type="text" />
        {/if}
        {#if ['regex'].includes(action.action)}
            <input bind:value={action.options[0]} type="text" />
        {/if}
        <button class="remove" onclick={remove}>-</button>
    </div>
{/if}

<style>
    .nested-builder {
        padding: 1.75em;
        position: relative;
        border: 1px solid #ccc;
        border-radius: 0.5em;
        margin-bottom: 1em;
    }

    .action {
        z-index: 1;
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        background-color: antiquewhite;
    }

    .remove {
        position: absolute;
        width: 1rem;
        height: 1rem;
        background-color: #ffcccb;
        color: white;
        border-radius: 50%;
        text-align: center;
        line-height: 1rem;
        right: 0; 
        top: 0;
        bottom: 0;
        margin: auto 0;
        transform: translateX(150%);
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .remove:hover {
        background-color: #ff7a78;
    }
</style>