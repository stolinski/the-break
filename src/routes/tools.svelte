<script>
	import kebabCase from 'just-kebab-case';
	import { page } from '$lib/state/page';

	page.set({ title: 'Tools' });

	let links = ['Battle Mode', '30s'];
</script>

<div class="tools">
	{#each links as link}
		<div>
			<a href={kebabCase(link)}>{link}</a>
			<p>Description coming soon...</p>
		</div>
	{/each}
</div>

<style>
	.tools {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
	}

	.tools div {
		padding: 40px;
		background-color: rgba(255, 255, 255, 0.02);
	}

	a {
		font-size: 24px;
		border-bottom: 2px solid #f89b4b;
	}
</style>
