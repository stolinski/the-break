<script lang="ts" context="module">
	import { user, auth_check } from '$lib/state/session';
	import { page } from '$lib/state/page';
	import Auth from '$lib/Auth.svelte';

	auth_check();
</script>

<header>
	<h1>{$page.title}</h1>
	<nav>
		<a href="/">Moves</a>
		<a href="/battle">Battle</a>
		<a href="/profile">Settings</a>
	</nav>
</header>

<div class="container">
	{#if $user}
		<slot />
	{:else}
		<Auth />
	{/if}
</div>

<style>
	:global(body) {
		background-color: #111;
		color: #eee;
		font-family: sans-serif;
	}

	:global(a) {
		color: #eee;
		text-decoration: none;
	}

	:global(input, select) {
		color: #eee;
		background: transparent;
		border: solid 1px #eee;
		border-radius: 3px;
		font-size: 24px;
	}
	:global(input[type='submit']) {
		color: #eee;
		background: blue;
		border: none;
		font-weight: bold;
		border-radius: 3px;
		font-size: 24px;
	}

	nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 80px;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
	}
</style>
