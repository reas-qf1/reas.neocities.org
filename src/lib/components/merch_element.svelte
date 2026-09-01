<script lang="ts">
    import { resolve } from "$app/paths";
	import type { Merch, Release } from "$lib/common";

    const { release, product } : {release: Release, product: Merch} = $props();
</script>

<div>
    <a href={product.link} rel="noopener noreferrer external">
        <img src={product.image} class="merch-image" alt="merch link" />
    </a>
    <div class="merch-padding">
        <a class="size32 info-artist-underline" href={resolve("/info?id=" + release.id)}>
            {release.artist} - {release.title}
        </a>
    </div>
    <div>
        {@html product.description}
    </div>
    {#if product.quantity}
        <div style="color: #bbb;">
            {product.quantity} remaining
        </div>
    {/if}
</div>

<style>
    .size32 {
        font-size: 32px;
    }

    .info-artist-underline {
        border-bottom: 1px solid #fff;
    }

    .merch-image {
        object-fit: cover;
        width: 100%;
    }

    .merch-padding {
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>