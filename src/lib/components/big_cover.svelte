<script lang="ts">
    const { cover } : { cover?: string } = $props();
</script>

{#if cover}
    {#if cover.substring(cover.length - 4) == ".jpg"}
        {#await import(`$lib/assets/covers_big/${cover.substring(0, cover.length - 4)}.jpg`) then { default: src }}
            <img class="album-art" loading="lazy" src={src} alt="cover" />
        {/await}
    {:else}
        {#await import(`$lib/assets/covers_big/${cover.substring(0, cover.length - 4)}.png`) then { default: src }}
            <img class="album-art" loading="lazy" src={src} alt="cover" />
        {/await}
    {/if}
{/if}

<style>
    .album-art {
        object-fit: cover;
        width: 100%;
        vertical-align: middle;
        padding: 10px 20px 5px;
        display: inline-block;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>