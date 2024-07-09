<script lang="ts">
	import Verify from '$/lib/auth/Verify.svelte'
	import Nav from '$/lib/Nav.svelte'
	import { moves } from '$state/moves.svelte'
	import {auth_guard} from '$utils/auth_guard';
	import { page as skpage } from '$app/stores'
	import { page } from '$lib/state/page'
	import { invalidate } from '$app/navigation'
	import { pb } from '$/pocketbase.js'

	const { data, children } = $props()
	$effect.pre(auth_guard);
	
	moves.load();

    $effect(() => {
      return pb.collection('users').subscribe(pb.authStore.model.id, async () => {
				await pb.collection('users').authRefresh();
				invalidate('app:user');
			});
    });


</script>

{#if data.user && !data.user.verified}
	<Verify user={data.user} />
{/if}

{#if $skpage.url.pathname !== '/time'}
	<header>
		<h1>{$page.title}</h1>
	</header>
{/if}

<Nav />

{@render children()}

<style>

	h1 {
		margin: 1rem auto;
	}

	header {
		padding: 15px 10px;
	}
</style>