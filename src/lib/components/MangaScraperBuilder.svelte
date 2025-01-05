<script lang="ts">
    type Props = {
        urls?: string[],
    };

    let { urls = [] }: Props = $props();

</script>

{#each urls as url}
    <p>{url}</p>
{/each}