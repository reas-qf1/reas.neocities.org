<script lang="ts">
	import banner_cropped from '$lib/assets/banner_cropped.png';
	import menu from '$lib/assets/menu.svg';
    import { resolve } from '$app/paths';
	import { changelog } from '$lib/data/changelog';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { dateToString } from '$lib/common';
	import { discography } from '$lib/data/discography';

    let { active = null, children } = $props();

    const activeL = active === null ? [] : active.split(" ");
    function match(x: string) {
        return activeL.includes(x);
    }

    var ready = $state(false);
    var showing = $state(false);

    onMount(() => {
        const isMobile = window.innerWidth <= 1080;
        if (isMobile) {
            document.getElementsByClassName("mobile-menu-div")[0].addEventListener('click', (e) => {
                showing = !showing;
            })
        } else {
            showing = true;
        }
        ready = true;
    });
</script>

{#snippet section_link(name: string, url: string, text: string)}
    <div class="section link-div nav-link-div">
        <a href={resolve(url)} class={"nav-link" + (match(name) ? " current-link" : "")}>{text}</a>
    </div>
{/snippet}

{#snippet sort_link(name: string, url: string, text: string)}
    <div class="link-div">
        <a href={resolve(url)} class={"sort-link" + (match(name) ? " current-link" : "")}>{text}</a>
    </div>
{/snippet}

<div class="wrapper">
    <div id="navbar">
        <div class="nav-box">
            <div class="navigation">
                <div class="section" style="display:flex;">
                    <a href={resolve("/")} class="main-banner">
                        <img src={banner_cropped} alt="banner">
                    </a>
                    <div class="mobile-menu-div">
                        <div style="width:100%; height:64px;"></div>
                        <button class="mobile-menu" id="mobile-menu">
                            <img src={menu} width="64" height="100%" alt="menu">
                        </button>
                    </div>
                </div>
                {#if ready}
                    <div class="menu-items">
                        {#if showing}
                            <div class="section" id="mobile-dropdown" transition:slide>
                                {@render section_link("links", "/links", "L I N K S")}
                                <div class="section link-div nav-link-div" id="link-container">
                                    <a href={resolve("/music")} class={"nav-link" + (match("music") ? " current-link" : "")} style="width:100%;">M U S I C</a>
                                    <div class="section" id="music-nav" style="margin-bottom: 0;">
                                        {@render sort_link("default", "/music", "default")}
                                        {@render sort_link("recent", "/music/recent", "chronologically")}
                                        {@render sort_link("alias", "/music/alias", "by alias")}
                                        {@render sort_link("vault", "/music/vault", "old releases")}
                                    </div>
                                </div>
                                {@render section_link("merch", "/merch", "M E R C H")}
                                <!-- {@render section_link("misc", "/misc", "O T H E R")} -->
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
            <div class="lol version-info">
                v{changelog[0].version} - {changelog[0].date}
                (<a class="version-info" href={resolve("/changelog")}><u>changelog</u></a>)
                <br>
                last database update: {dateToString(discography.lastUpdated)}
                <br><br>
                "sex 2" © @SaintFiji89
            </div>
        </div>
    </div>
    <div class="main-div-wrapper">
        <div class="main-div" id="content">
            {@render children()}
        </div>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
    }

    .nav-box {
        display: flex;
        flex-direction: row;
    }

    .navigation {
        position: sticky;
        left: 0px;
        top: 0px;
        width: 450px;
        height: 100vh;
        margin-right: 0px;
        background-color: #fff1;
        border-right: #bbbb 2px solid;
    }

    .main-banner {
        transition: background 150ms ease;
    }

    .main-banner:hover {
        background-color: #fff1;
    }

    .section {
        width: 100%;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .main-div-wrapper {
        margin: 0;
        flex-grow: 1;
    }

    .main-div {
        overflow-y: scroll;
        height: 100vh;
        padding: 10px;
    }

    .main-banner {
        display: block;
        width: 100%;
    }

    .main-banner > img {
        object-fit: cover;
    }

    .mobile-menu-div, .mobile-menu {
        display: none;
    }

    .link-div {
        width: 100%;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-right: 0px;
        display: table;
    }

    .nav-link-div {
        background: #ffffff05;
    }

    .nav-link {
        width: 100%;
        color: #555;
        font-size: 25px;
        line-height: inherit;
        transition: color 150ms ease;
    }

    .nav-link:hover {
        color: #777;
    }

    .sort-link {
        color: #505050;
        font-size: 16px;
        transition: color 150ms ease;
    }

    .sort-link:hover {
        color: #707070;
    }

    .current-link {
        color: #888;
    }

    .current-link:hover {
        color: #999;
    }

    .vault-icon {
        width: 25px;
        height: 25px;
    }

    .lol {
        position: fixed;
        bottom: 0;
        margin-left: 13px;
    }

    .version-info {
        font-size: 10px;
        color: #555;
        margin-bottom: 13px;
    }

    @media (max-width: 1080px) {
        a {
            font-size: 1em !important;
        }

        .nav-link {
            font-size: 48px !important;
        }

        .sort-link {
            font-size: 32px !important;
        }

        .nav-box {
            flex-direction: column;
        }

        .navigation {
            width: 100%;
            height: auto;
            border-right: 0px;
            border-bottom: #bbbb 2px solid;
            z-index: 1000;
            background: #000;
        }

        .navigation > .section {
            margin-bottom: 0;
        }

        .mobile-menu-div {
            display: flex;
            position: sticky;
            top: 0px;
            width: 100%;
        }

        .mobile-menu {
            display: inherit;
            background-color: #fff0;
            border: 0px;
            margin-right: 20px;
            max-height: 50px;
        }

        .lol {
            top: 10px;
            left: 50%;
            transform: translate(-50%, 0);
            bottom: unset;
            z-index: 1001;
            margin: auto 0;
        }

        .wrapper {
            flex-direction: column;
        }

        .main-banner {
            width: auto;
            padding-left: 10px;
        }

        .main-banner > img {
            max-height: 50px;
        }

        .main-div-wrapper {
            padding: 0;
        }

        .main-div {
            height: unset;
            position: fixed;
            top: 81px;
            bottom: 0;
            width: calc(100vw - 20px);
        }

        .menu-items {
            position: absolute;
            background: black;
            width: 100%;
            border-bottom: #bbbb 2px solid;
        }
    }
</style>