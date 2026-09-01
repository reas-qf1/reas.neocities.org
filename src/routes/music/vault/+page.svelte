<svelte:head>
    <title>reas - music</title>
</svelte:head>

<script lang="ts">
    import NavbarWrapper from "$lib/components/navbar_wrapper.svelte";
    import { discography } from "$lib/data/discography";
	import DiscographyEntry from "$lib/components/discography_entry.svelte";

    const releases = discography.entries.filter((x) => x.category == "old").reverse();
</script>

<NavbarWrapper active="music vault">
    <div id="vault-header">
        <h1 class="vault-title">The Vault Of Lost Releases</h1>
        <p>
            releases that were removed from the main pages, either due to being bad or being reworked/included in a later release.
            <br>
            im not stopping you from listening to them, i'm just saying there's no point in doing that
            <br>
            also shout out to alex from ssc for the name idea
        </p>
    </div>
    <div class="table">
        {#each releases as release (release.id)}
            <DiscographyEntry release={release} />
        {/each}
    </div>
</NavbarWrapper>

<style>
    .table {
        padding-top: 40px;
        padding-bottom: 100px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 17px;
    }

    .vault-title {
        font-size: 48px;
    }

    @media (max-width: 1500px) {
        .table {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media (max-width: 1200px) {
        .table {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 1080px) {
        .table {
            grid-template-columns: 1fr;
        }
    }
</style>