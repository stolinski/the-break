<script lang="ts">
	import { page as skpage } from '$app/stores';
	import '$lib/style.css';
	import { user, auth_check } from '$lib/state/session';
	import { page } from '$lib/state/page';
	import Auth from '$lib/Auth.svelte';

	auth_check();
</script>

<div class="container">
	<header>
		<h1>{$page.title}</h1>
		<nav>
			<a class:active={$skpage.url.pathname === '/'} href="/">Moves</a>
			<a class:active={$skpage.url.pathname === '/tools'} href="/tools">Tools</a>
			<a class:active={$skpage.url.pathname === '/profile'} href="/profile">Settings</a>
		</nav>
	</header>

	{#if $user}
		<slot />
	{:else}
		<Auth />
	{/if}
</div>

<style>
	:global(body) {
		font-family: sans-serif;
		--black: #0b0a08;
		--white: #fbf0df;
		--bg: var(--black);
		--color: var(--white);

		color: var(--color);
		background-color: var(--bg);
	}

	:global(a) {
		color: var(--white);
		text-decoration: none;
	}

	:global(input, select) {
		color: var(--white);
		background: transparent;
		border: solid 1px var(--white);
		border-radius: 3px;
		font-size: 24px;
		width: 100%;
		padding: 8px;
	}

	:global(label) {
		font-size: 14px;
		margin-bottom: 5px;
		color: var(--white);
		opacity: 0.5;
		display: block;
	}

	:global(input[type='submit']),
	:global(button) {
		color: var(--white);
		background: blue;
		box-shadow: var(--shadow-3);
		border: none;
		font-weight: bold;
		border-radius: 8px;
		font-size: 18px;
		padding: 10px;
	}

	h1 {
		margin-bottom: 40px;
	}

	nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 60px;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
		z-index: 10;
		background: var(--bg);
	}

	.active {
		color: #f89b4b;
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding-bottom: 200px;
	}
</style>
