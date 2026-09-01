<svelte:head>
    <title>reas - links</title>
</svelte:head>

<script lang="ts">
	import NavbarWrapper from "$lib/components/navbar_wrapper.svelte";
    import icon_reas from '$lib/assets/icon_reas.jpg';
    import icon_virtualwave from '$lib/assets/icon_virtualwave.jpg';
    import icon_twilightdreams from '$lib/assets/icon_twilightdreams.jpg';
    import icon_dreamwav from '$lib/assets/icon_dreamwav.jpg';
    import icon_vdpworld from '$lib/assets/icon_vdpworld.jpg';
    import icon_equals0 from '$lib/assets/icon_equals0.jpg';
</script>

{#snippet bandcamp(link: string, icon: string, alt: string)}
    <div class="bc-link-container">
        <a target="_blank" rel="noopener noreferrer" href={"https://" + link + ".bandcamp.com/"}>
            <img class="bc-ico" src={icon} alt={alt}>
        </a>
    </div>
{/snippet}

{#snippet link(link: string, platform: string, username: string | null = null)}
    <a class="links-header" target="_blank" rel="noopener noreferrer external" href={link}>
        {platform}
        {#if username}
            <span class="username">{username}</span>
        {/if}
    </a>
{/snippet}

<NavbarWrapper active="links">
    <div class="section">
        <h2 class="intro">
            <b>my links</b>
        </h2>
    </div>
    <div class="section links-table">
        <p class="links-header link-bc-header">bandcamps</p>
        <div>
            {@render bandcamp("reas7", icon_reas, "reas bandcamp")}
            {@render bandcamp("virtualwave", icon_virtualwave, "virtualwave bandcamp")}
            {@render bandcamp("twilightdreams", icon_twilightdreams, "twilightdreams bandcamp")}
            {@render bandcamp("equals0", icon_equals0, "equals0 bandcamp")}
            {@render bandcamp("vdpworld", icon_vdpworld, "vdpworld bandcamp")}
            {@render bandcamp("dreamwav1", icon_dreamwav, "dream.wav bandcamp")}
        </div>
    </div>
    <div class="section links-table" style="flex-direction:column;">
        {@render link("https://open.spotify.com/artist/270bxIu3Lu6bY66mrIV2Xu", "reas on spotify")}
        {@render link("https://www.youtube.com/@reas_qf0", "youtube:", "@reas_qf0")}
        {@render link("https://github.com/reas-qf1", "github:", "reas-qf1")}
        {@render link("https://last.fm/user/reas_qf0", "last.fm:", "reas_qf0")}
        {@render link("https://www.patreon.com/reas_qf0", "patreon:", "reas_qf0")}
        {@render link("https://twitter.com/reas_qf0", "twitter:", "reas_qf0")}
        {@render link("mailto:reas.qf0@gmail.com", "email:", "reas.qf0@gmail.com")}
    </div>
</NavbarWrapper>

<style>
    .section {
        width: 100%;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .intro {
        font-weight: 400;
        color: #ddd;
        margin-block-start: 10px;
        margin-block-end: 10px;
        font-size: 40px;
    }

    .links-table {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .links-header {
        color: #888;
        font-size: 2em;
        line-height: inherit;
        float: left;
        text-align: center;
        vertical-align: middle;
        padding-top: 15px;
        padding-bottom: 15px;
        display: table;
        transition: color 150ms ease;
    }

    .links-header:hover {
        color: #bbb;
    }

    .link-bc-header {
        width: 10%;
        margin-right: 40px;
        text-align: right;
        padding: 0;
    }

    .link-bc-header:hover {
        color: #888;
    }

    .bc-link-container {
        object-fit: contain;
        display: table-cell;
        vertical-align: middle;
        padding-left: 40px;
        padding-right: 40px;
    }

    .bc-ico {
        width: 25px;
        height: 100%;
    }

    .username {
        color: #555;
        font-size: 1em;
        transition: color 150ms ease;
    }

    .links-header:hover .username {
        color: #777;
    }

    @media (max-device-width: 1080px) {
        .bc-link-container {
            padding-left: 10px;
            padding-right: 10px;
        }

        .links-table {
            flex-direction: column;
        }

        .link-bc-header {
            margin-right: 0;
        }
    }
</style>