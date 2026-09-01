<script lang="ts">
	import { resolve } from "$app/paths";
	import SmallCover from "./small_cover.svelte";
	import { archiveLinkFlac, archiveLinkMP3, dateToString, type Release } from "../common";
	import { slide } from "svelte/transition";
	import { onMount } from "svelte";

    const { release } : { release: Release } = $props();

    var showing = $state(false);
    var element: HTMLDivElement;
    onMount(() => {
        const isMobile = window.innerWidth <= 1080;
        if (isMobile) {
            element.addEventListener('click', (e) => {
                showing = !showing;
            })
            element.addEventListener('mouseleave', (e) => {
                showing = false;
            })
        } else {
            var i;
            element.addEventListener('mouseenter', (e) => {
                i = setTimeout(() => { showing = true }, 250);
            })
            element.addEventListener('mouseleave', (e) => {
                clearTimeout(i);
                showing = false;
            })
        }
    });
</script>

<div class="link-block" bind:this={element}>
    <div class="album-art-wrapper">
        <a class="album-link" href={resolve("/info?id=" + release.id)}>
            <SmallCover cover={release.cover} />
        </a>
    </div>
    <div class="album-name">{release.title}</div>
    <div class="artist-name">{release.artist}</div>
    <div class="release-date">{dateToString(release.date)}</div>
    {#if showing}
        <div class="album-link-div" transition:slide>
            <a class="album-link" href={resolve("/info?id=" + release.id)}>Information</a>
            {#if release.ia_id}
                <a class="album-link" href={archiveLinkFlac(release)} rel="noopener noreferrer external">Download FLAC</a>
                <a class="album-link" href={archiveLinkMP3(release)} rel="noopener noreferrer external">Download MP3</a>
            {/if}
        </div>
    {/if}
</div>

<style>
    .link-block {
        border: 1px solid #444;
        text-decoration: none;
        position: relative;
        transition: background 150ms ease;
    }

    .link-block:hover {
        background-color: #ffffff15;
    }

    .album-link-div {
        width: calc(100% - 10px);
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 20px;
        gap: 8px;
        padding: 5px;
        position: absolute;
        left: -1px;
        height: 75px;
        top: 100%;
        float: left;
        backdrop-filter: brightness(20%) blur(15px);
        border-left: 1px solid #444;
        border-right: 1px solid #444;
        border-bottom: 1px solid #444;
        z-index: 999;
        transition: background 150ms ease;
    }

    .link-block:hover .album-link-div {
        background-color: #ffffff15;
    }

    .album-name {
        padding-top: 5px;
        color: #eee;
        font-size: 22px;
        font-style: normal;
        text-align: center;
        text-decoration: none;
    }

    .artist-name {
        color: #ccc;
        font-weight: 700;
    }

    .release-date {
        color: #555;
        padding-top: 5px;
        padding-bottom: 15px;
    }

    .album-link {
        color: #66a;
        font-weight: 300;
        width: 100%;
    }

    .album-art-wrapper {
        padding: 10px 20px 5px;
    }

    @media (max-width: 1080px) {
        .link-block {
            margin: 0 20px;
        }
    }
</style>