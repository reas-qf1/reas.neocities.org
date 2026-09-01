<script lang="ts">
    import { compile } from "mdsvex";

    const { text } : { text: string } = $props();
</script>

{#await compile(text.replaceAll('\n', '  \n')) then md}
    {@html md.code}
{/await}