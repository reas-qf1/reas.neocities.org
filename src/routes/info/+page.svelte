<script lang="ts">
    import NavbarWrapper from "$lib/components/navbar_wrapper.svelte";
	import BigCover from "$lib/components/big_cover.svelte";
	import { resolve } from "$app/paths";
	import { archiveLinkFlac, archiveLinkMP3, descriptionOrDefault, linkIcon, dateToString, type Link, type Release } from "$lib/common";
	import MerchElement from "$lib/components/merch_element.svelte";
	import { onMount } from "svelte";
	import { discography } from "$lib/data/discography";
    import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import Markdown from "$lib/components/markdown.svelte";

    var release = $state<Release | null>(null);
    $effect(() => {
        const id = page.url.searchParams.get("id");
        if (id === null) {
            goto(resolve("/not_found"), { replaceState: true });
        }
        const release_ = discography.entries.filter((x) => { return x.id == id })[0];
        if (release_ === undefined) {
            goto(resolve("/not_found"), { replaceState: true });
        }
        release = release_;
    })

    let showingText = $state(true);

    function prepareDescription(raw: string) {
        var text = raw.split('\n').join('<br>')
        const url_regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
        const matches = text.match(url_regex);
        if (matches === null) return text;
        for (const match of matches) {
            text = text.replace('<a href="' + match + '">', '<a href="###">')
            text = text.replace(match, '<a class="info-text info-text-link" style="padding: 0;" href="' + match + '" target="_blank" rel="noopener noreferrer external">' + match + '</a>');
            text = text.replace('###', match);
        }
        return text;
    }

    let isMobile = $state(false);
    onMount(() => {
        isMobile = window.innerWidth <= 1080;
    })
</script>

{#snippet linkSnippet(link: Link)}
    <li class="info-link">
        <img class="link-icon" alt="site icon" style="padding-right:8px" src={linkIcon(link)} />
        <a class="info-link-a" target="_blank" rel="noopener noreferrer external" href={link.link}>
            {descriptionOrDefault(link)}
        </a>
    </li>
{/snippet}

<svelte:head>
    {#if release}
        <title>{release.artist} - {release.title}</title>
    {/if}
</svelte:head>

{#if release}
    <NavbarWrapper active="music">
        <div class="info-table">
            <div>
                <h1 class="info-album-name">{release.title}</h1>
                <h1 class="info-artist-name">
                    by
                    <a class="info-artist-name info-artist-underline" href={resolve("/music/alias?name=[artist]", {artist: release.artist_sort ?? release.artist})}>
                        {release.artist}
                    </a>
                </h1>
                {#if isMobile}
                    <BigCover cover={release.cover} />
                {/if}
                <div class="section info-player-padding">
                    {#if showingText}
                        <p style="color:#888;">Loading archive.org player embed...</p>
                    {/if}
                    <iframe width="100%" height="400px" frameborder="0" allow="fullscreen"
                        src={"https://archive.org/embed/" + (release.ia_id.includes('/') ? release.ia_id + ".flac" : release.ia_id)  + "?playlist=1"}
                        title="Archive.org player"
                        onload={() => { showingText = false; }}
                    ></iframe>
                </div>
            </div>
            {#if !isMobile}
                <div class="info-art-padding">
                    <BigCover cover={release.cover} />
                </div>
            {/if}
            <div>
                <div class="info-link-header" style="padding-top: 30px; padding-bottom: 30px;">
                    <b>About</b>
                </div>
                <div class="info-text" style="color: #eee;" id="release-date">
                    released {dateToString(release.date)}
                </div>
                <p class="info-text" id="description">
                    {#if release.description}
                        <Markdown text={release.description} />
                    {/if}
                </p>
            </div>
            <div class="info-section">
                <div class="info-link-header">
                    <b>Links</b>
                </div>
                <ul id="links">
                    {#if release.links}
                        {#each release.links as link (link.link)}
                            {@render linkSnippet(link)}
                        {/each}
                    {/if}
                    {@render linkSnippet({
                        site: "ia",
                        link: archiveLinkFlac(release),
                        description: "Direct Download (FLAC)"
                    })}
                    {@render linkSnippet({
                        site: "ia",
                        link: archiveLinkMP3(release),
                        description: "Direct Download (MP3)"
                    })}
                </ul>
            </div>
        </div>

        {#if release.merch}
            <h1 class="info-artist-name info-sample-header">
                <a class="info-artist-name info-sample-header" href={resolve("/merch")}>
                    <b><u>Merch</u></b>
                </a>
            </h1>
            <div class="section merch-table">
                {#each release.merch as product}
                    <MerchElement release={release} product={product} />
                {/each}
            </div>
        {/if}

        {#if release.samples}
            <h1 class="info-artist-name info-sample-header">Samples</h1>
            <div class="info-sample-table">
                <div class="info-text" style="font-size: 20px">No.</div>
                <div class="info-text" style="font-size: 20px">Sample</div>
                <div class="info-text" style="font-size: 20px">Notes</div>

                {#each release.samples as sample}
                    <div class="line"></div>
                    <div class="info-text" style="text-align: center;">{sample.tracks}</div>
                    <div class="info-text">
                        {#if sample.link}
                            <a target="_blank" rel="noopener noreferrer external" href={sample.link}>
                                {sample.name === null ? "" : sample.name}
                            </a>
                        {:else}
                            <div style="text-align: left;">{sample.name}</div>
                        {/if}
                    </div>
                    <div class="info-text">
                        {#if sample.notes}
                            <Markdown text={sample.notes} />
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </NavbarWrapper>
{/if}

<style>
    .section {
        width: 100%;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .info-table {
        padding-top: 20px;
        padding-left: 50px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0px;
    }

    .info-album-name {
        margin-top: 5px;
        margin-bottom: 3px;
        font-size: 48px;
        text-align: left;
        font-weight: 200;
    }

    .info-artist-name {
        margin: 0;
        font-size: 28px;
        text-align: left;
        color: #ddd;
        font-weight: 350;
    }

    .info-artist-underline {
        border-bottom: 1px solid #666;
    }

    .info-player-padding {
        padding-top: 30px;
    }

    .info-art-padding {
        padding: 0px 8%;
    }

    .info-text, .info-text :global(*) {
        text-align: left;
        color: #ccc;
    }

    .info-text :global(a) {
        text-decoration: underline;
    }

    .info-link {
        display: flex;
        align-items: center;
        width: 100%;
        padding-bottom: 8px;
    }

    .info-link-a {
        text-decoration: underline;
        text-align: left;
    }

    .info-section {
        margin-top: 30px;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .info-link-header {
        font-size: 28px;
        text-align: left;
        color: #ddd;
    }

    .info-sample-header {
        margin: 0.5em 0;
        padding-left: 50px
    }

    .info-sample-table {
        margin: 0px 50px 50px;
        display: grid;
        grid-template-columns: 60px 1fr 2fr;
        border: 1px solid #eee;
        grid-gap: 1px;
    }

    .info-sample-table > div {
        box-sizing: content-box;
        margin: 10px 15px;
    }

    .info-sample-table a {
        text-decoration: underline;
    }

    .line {
        grid-column-start: 1;
        grid-column-end: -1;
        height: 2px;
        margin: 0px !important;
        border-bottom: 1px solid #eee;
        width: 100%;
    }

    .merch-table {
        width: auto;
        margin-left: 35px;
        margin-bottom: 50px;
    }

    .link-icon {
        width: 24px;
        height: 24px;
    }

    @media (max-device-width: 1080px) {
        .info-art-padding {
            padding: 0;
        }

        .info-table {
            grid-template-columns: 1fr;
            padding: 0;
        }

        .info-section {
            align-items: flex-start;
        }

        .info-link {
            padding: 8px;
        }

        .info-link-a {
            font-size: 1.2em !important;
        }

        ul {
            padding: 0;
        }

        .info-sample-header {
            padding: 0;
        }

        .info-sample-table {
            margin: 0;
        }
    }
</style>