<svelte:head>
    <title>reas - merch</title>
</svelte:head>

<script lang="ts">
    import NavbarWrapper from "$lib/components/navbar_wrapper.svelte";
    import { discography } from "$lib/data/discography";
	import { resolve } from "$app/paths";
	import MerchElement from "$lib/components/merch_element.svelte";

    const releasesWithMerch = discography.entries.filter((x) => { return x.merch !== undefined });
</script>

<NavbarWrapper active="merch">
    <h1 class="vault-title">Physicals In Stock</h1>
    <div class="normal">
        all info on this page is updated manually every once in a while. if you see a physical that went out of stock but is listed as on sale here, please
        <a href={resolve("/links")}><u>contact me</u></a>
        immediately
    </div>
    {#if releasesWithMerch.length > 0}
        <div class="merch-table section" id="merch-table">
            {#each releasesWithMerch.reverse() as release}
                {#each release.merch as product}
                    <MerchElement release={release} product={product} />
                {/each}
            {/each}
        </div>
    {:else}
        <h1 class="vault-title" id="no-merch">No items in stock. Come back later!</h1>
    {/if}
</NavbarWrapper>

<style>
    .vault-title {
        font-size: 48px;
    }

    .merch-table {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-top: 30px;
    }

    .merch-table > :global(div) {
        border: 1px solid #ccc;
        padding: 15px;
        margin: 15px;
    }

    @media (max-device-width: 1080px) {
        .normal {
            font-size: 15px;
        }
    }
</style>