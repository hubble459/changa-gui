<script lang="ts">
    import { Chainy } from 'chainy';
    interface Props {
        action: Chainy['items'][number];
        remove: () => void;
    }

    const props: Props = $props();
</script>

{#if props.action instanceof Chainy}
    <p>meow</p>
{:else}
    <div class="action">
        {#if props.action.action === 'select'}
            <p>select</p>
            <input bind:value={props.action.options[0]} type="text" />
        {:else}
            <p>{props.action.action}</p>
        {/if}
        <button class="remove" onclick={props.remove}>-</button>
    </div>
{/if}

<style>
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
        background-color: red;
    }
</style>