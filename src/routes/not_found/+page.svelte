<svelte:head>
    <title>reas - page not found</title>
</svelte:head>

<script>
	import NavbarWrapper from "$lib/components/navbar_wrapper.svelte";
	import { resolve } from "$app/paths";
</script>

<NavbarWrapper>
    <div class="section">
        <h2 class="intro size32">Oops!</h2>
        <h2 class="intro size24">
            The URL you tried to follow could not be found.
            <br>
            It might be because the section of the site the link was directing to has since been moved.
            <br>
            Click
            <a class="intro size24" href={resolve("/")}><u>here</u></a>
            to return to the main page, or use the menu to navigate the site.
        </h2>
    </div>
</NavbarWrapper>

<style>
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
</style>