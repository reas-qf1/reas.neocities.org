<svelte:head>
    <title>reas - music</title>
</svelte:head>

<script lang="ts">
    import NavbarWrapper from "$lib/components/navbar_wrapper.svelte";
    import { discography } from "$lib/data/discography";
	import DiscographyEntry from "$lib/components/discography_entry.svelte";

    const releases = discography.entries.filter((x) => x.category !== "old").reverse();
</script>

<NavbarWrapper active="music recent">
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

    .table-header {
        font-size: 40px;
        font-weight: 600;
        color: #aaa;
        grid-column: 1 / -1;
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