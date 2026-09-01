<svelte:head>
    <title>reas</title>
</svelte:head>

<script lang="ts">
    import NavbarWrapper from "$lib/components/navbar_wrapper.svelte";
    import Intro from '$lib/data/intro.md';
    import { resolve } from '$app/paths';
</script>

{#snippet alias(name: string, description: string, styles: string)}
    <a href={resolve('/music/alias?name=[artist]', {artist: name})}>{name}</a>
    - {description}
    <br>
    styles - {styles}
    <br><br>
{/snippet}

<NavbarWrapper>
    <div class="section index-section">
        <h2 class="intro size32">oh hey! welcome to my website.</h2>
        <br>
        <h2 class="intro size24">use the menu on the left (or on the top if you're on mobile) to navigate the pages.</h2>
        <div class="section index-section" style="height: 50px;"></div>
        <h2 class="intro size24">about me</h2>
        <div class="intro-md">
            <Intro />
        </div>
        <div class="section index-section" style="height: 50px;"></div>
        <h2 class="intro size24">alias info</h2>
        <p style="text-align: left;">
            {@render alias(
                "reas",
                '"main" alias i use, also a nickname for my online presence',
                "ambient, drone, slushwave"
            )}
            {@render alias(
                "仮想現実での生活",
                "alias used in 2020-2023; slushwave side-project",
                "vaporwave, slushwave, ambient"
            )}
            {@render alias(
                "twilightdreams",
                "a continuation of 仮想現実での生活, focused on more longform and ambient-leaning slushwave",
                "ambient, slushwave"
            )}
            {@render alias(
                "Sphyral",
                'alias for "experimental", but still high-effort works; mostly plunderphonics. operates under the equals0 umbrella project',
                "plunderphonics, glitch, ambient, idm"
            )}
            {@render alias(
                "worldwide networks",
                "(previously W.W.N.W.) the other most significant alias under the equals0 umbrella; focuses on resampling commercials",
                "signalwave, plunderphonics, ambient, glitch"
            )}
            {@render alias(
                "ｄｒｅａｍ．ｗａｖ",
                "alias used in 2021-2022; dreamtone side-project",
                "dreamtone, drone, ambient"
            )}
            {@render alias(
                "仮想夢世の中",
                "alias used in 2021-2022; Virtual Dream Plaza-themed side-project",
                "slushwave, ambient"
            )}
            {@render alias(
                "リラックスして眠る",
                "alias mostly used in 2019-2020 and for a couple releases in 2021",
                "drone, ambient, vaporwave"
            )}
            
            other aliases are mostly one-offs under the
            <a href="https://equals0.bandcamp.com" target="_blank" rel="noopener noreferrer">equals0</a>
            project for random ideas
        </p>
    </div>
</NavbarWrapper>

<style>
    .index-section {
        padding: 15px;
    }

    .size32 {
        font-size: 32px;
    }

    .size24 {
        font-size: 24px;
    }

    .intro {
        font-weight: 400;
        color: #ddd;
        margin-block-start: 10px;
        margin-block-end: 10px;
    }

    .intro-md :global(p) {
        text-align: left;
    }

    @media (max-width: 1080px) {
        .index-section {
            padding: 10px;
        }
    }
</style>