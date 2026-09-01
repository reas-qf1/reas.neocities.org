<script lang="ts">
    import blankCover from "$lib/assets/blank_small.png";

    const { cover } : { cover?: string } = $props();
</script>

{#if cover}
    {#await import(`$lib/assets/covers_small/${cover.substring(0, cover.length - 4)}.jpg`) then { default: src }}
        <img class="album-art" loading="lazy" src={src} alt="cover" />
    {/await}
{:else}
    <img class="album-art" loading="lazy" src={blankCover} alt="cover" />
{/if}

<style>
    .album-art {
        object-fit: cover;
        width: 100%;
        vertical-align: middle;
        display: inline-block;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>