<svelte:head>
    <title>reas - music</title>
</svelte:head>

<script lang="ts">
    import NavbarWrapper from "$lib/components/navbar_wrapper.svelte";
    import { discography } from "$lib/data/discography";
	import DiscographyEntry from "$lib/components/discography_entry.svelte";
	import type { Category, Release } from "$lib/common";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

    const artist_sort: Array<Category> = [
            { key: "reas" },
            { key: "twilightdreams" },
            { key: "Sphyral" },
            { key: "\u4eee\u60f3\u73fe\u5b9f\u3067\u306e\u751f\u6d3b" },
            { key: "\u4eee\u60f3\u5922\u4e16\u306e\u4e2d" },
            { key: "worldwide networks" },
            { key: "\uff44\uff52\uff45\uff41\uff4d\uff0e\uff57\uff41\uff56" },
            { key: ")6" },
            { key: "One-time aliases" }
        ]

    var groups = $state<Array<{ key: string, entries: Release[] }>>([]);
    $effect(() => {
        const name = page.url.searchParams.get("name");
        if (name) {
            const releases = discography.entries.filter((release) => release.artist == name || release.artist_sort == name);
            console.log(releases);
            if (releases.length == 0) {
                goto(resolve("/music/alias"), { replaceState: true });
            }
            groups = [{key: name, entries: releases.reverse()}];
        } else {
            const releases = discography.entries.filter((x) => x.category !== "old");
            groups = artist_sort.map((x) => {
                var matches = releases.filter((release) => release.artist == x.key || release.artist_sort == x.key)
                if (x.reverse !== true)
                    matches.reverse();
                return {
                    key: x.key,
                    entries: matches
                }
            })
        }
    })
</script>

<NavbarWrapper active="music alias">
    {#each groups as group (group.key)}
        <div class="table">
            <h2 class="table-header">{group.key}</h2>
            {#each group.entries as release (release.id)}
                <DiscographyEntry release={release} />
            {/each}
        </div>
    {/each}
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