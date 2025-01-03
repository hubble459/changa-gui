<script lang="ts" module>
    type Labels = ReadonlyArray<string>;
</script>

<script lang="ts" generics="Labels extends ReadonlyArray<string>">
    import type { Snippet } from 'svelte';

    type Props = {
        labels: Labels;
        activeTab?: Labels[number];
        tab: Snippet<[Labels[number]]>;
    };

    let { labels, activeTab = $bindable(labels[0]), tab }: Props = $props();
  
    function handleClick(label: Labels[number]) {
        activeTab = label;
    }
</script>
  
<div class="tabs">
    <ul>
        {#each labels as label}
            <li class={activeTab === label ? 'active' : ''}>
                <button onclick={() => handleClick(label)}>{label}</button>
            </li>
        {/each}
    </ul>
    
    {#each labels as label}
        {#if activeTab === label}
            <div class="box">
                {@render tab(label)}
            </div>
        {/if}
    {/each}
</div>

<style>
    .tabs {
        width: 80%;
    }

    .box {
        margin-bottom: 10px;
        padding: 40px;
        border: 1px solid #dee2e6;
        border-radius: 0 0 .5rem .5rem;
        border-top: 0;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        border-bottom: 1px solid #dee2e6;
    }
  
    button {
        border: 1px solid transparent;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        display: block;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
  
    button:hover {
        border-color: #e9ecef #e9ecef #dee2e6;
    }
  
    li.active > button {
        color: #495057;
        background-color: #fff;
        border-color: #dee2e6 #dee2e6 #fff;
    }
  </style>