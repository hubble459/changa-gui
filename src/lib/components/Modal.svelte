<script module lang="ts">
    export type ModalType = {
        id: string;
        open: () => void;
        close: () => void;
    };
    export const modals: ModalType[] = [];
</script>

<script lang="ts">
    import { onDestroy, type Snippet } from 'svelte';
    import { fade } from 'svelte/transition';

    type Props = {
        id: string;
        children?: Snippet;
        visible: boolean;
    };

    let { id, children, visible = $bindable(false) }: Props = $props();

    function close() {
        visible = false;
    }

    function open() {
        visible = true;
    }

    $effect(() => {
        if (visible) {
            window.addEventListener('keydown', onKeyDown)
        } else {
            window.removeEventListener('keydown', onKeyDown)
        }
    });

    modals.push({
        id,
        open,
        close,
    });

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            close();
        }
	}

    onDestroy(() => {
        close();
        modals.splice(modals.findIndex((modal) => modal.id === id), 1);
    });
</script>

{#if visible}
    <div
        out:fade={{delay: 400}}
        in:fade
        class="modal-backdrop"
        {id}
        onclick={close}
        tabindex="-1"
        role="button"
        onkeypress={(e) => e.key === 'Escape' && close()}
        >
        <div class="modal" transition:fade={{duration: 300}}>
            <div class="modal-content">
                {@render children?.()}
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 182, 193, 0.8); /* Light pink background */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal {
        position: relative;
        border-radius: 12px; /* More rounded corners */
        background: #fff0f5; /* Lavender blush background */
        border: 2px solid #ffb6c1; /* Light pink border */
        filter: drop-shadow(5px 5px 10px #ffb6c1); /* Light pink shadow */
        padding: 1em;
        max-width: 90%;
        max-height: 90%;
        box-sizing: border-box;
    }

    .modal-content {
        max-width: 100%;
        max-height: 100%;
        overflow: auto;
    }
</style>
