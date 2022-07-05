<script lang="ts" context="module">
	import { user, auth_check } from '$lib/state/session';

	$: console.log('user', user);

	import Auth from '$lib/Auth.svelte';

	auth_check();
</script>

<header>
	<h1>Bboy Tools</h1>
	<nav>
		<a href="/">Moves</a>
		<a href="/profile">Profile</a>
		<a href="/battle">Battle</a>
	</nav>
</header>

<div class="container">
	{#if $user}
		<slot />
	{:else}
		<Auth />
	{/if}
</div>
