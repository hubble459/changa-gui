<script lang="ts">
    import { Changa } from 'changa';

    const changa = new Changa();
</script>

<h1>changa</h1>
<hr>
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

<style>
    th, td {
        padding: 0em 1em;
    }
</style>
