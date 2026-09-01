<svelte:head>
    <title>reas - site changelog</title>
</svelte:head>

<script lang="ts">
	import NavbarWrapper from "$lib/components/navbar_wrapper.svelte";
    import { changelog } from "$lib/data/changelog";
</script>

<NavbarWrapper>
    <h1 class="header">changelog</h1>

    <p class="text">
        {#each changelog as entry (entry.version)}
            <br><br>
            <b>v{entry.version} - {entry.date}</b>
            <br><br>
            {#each entry.changes as change (change)}
                - {@html change}
                <br>
            {/each}
        {/each}
    </p>
</NavbarWrapper>

<style>
    .header {
        font-size: 26px;
    }

    .text {
        color: #ccc;
    }
</style>