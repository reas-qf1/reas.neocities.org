<script lang="ts">
	import favicon from '$lib/assets/icon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<style>
	:global {
		body {
			background-color: black;
			background-image: url('$lib/assets/background.png');
			margin: 0;
			overflow: hidden;
		}

		h1, h2, h3, h4, h5, h6, p, a, div {
			color: white;
			text-decoration: none;
			text-align: center;
			font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
			font-size: 14px;
		}

		ul {
			list-style-type: none;
		}

		p > a, span > a {
			text-decoration: underline;
			font-size: 1em !important;
		}

		@media (max-width: 1080px) {
			a {
				font-size: 1em !important;
			}
		}
	}
</style>

{@render children()}