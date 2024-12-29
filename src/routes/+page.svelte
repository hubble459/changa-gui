<script lang="ts">
    import ChainyBuilder from '$lib/components/ChainyBuilder.svelte';
    import { Changa } from 'changa';

    const changa = new Changa();
</script>

<h1>changa</h1>

<form method="GET" action="/manga">
    <input name="url" type="url" placeholder="url">
    <button>go!</button>
</form>

<div>
    <table>
        <tbody>
            <tr>
                <th>hostname</th>
                <th>working</th>
            </tr>
        {#each changa.hostnames as hostname}
            <tr>
                <td>{hostname}</td>
                <td>{changa.accepts() ? 'yes' : 'no'}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<ChainyBuilder />

<style>
    th, td {
        padding: 0em 1em;
    }

    form {
        margin: 1em 0;
    }
</style>
