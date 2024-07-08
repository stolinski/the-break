<script lang="ts">
	import '$lib/style.css'

	const { children } = $props();
</script>



<main>
	{@render children()}
</main>

<style>

		main {
		display: grid;
		grid-template-columns: 2.5vw 95vw 2.5vw;
		padding-bottom: var(--nav_height);
	}
	main > :global(*) {
			grid-column: 2/3;
	}
</style>