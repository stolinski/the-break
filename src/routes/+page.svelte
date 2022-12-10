<script lang="ts">
	import Moves from '$lib/Moves.svelte'
	import { page } from '$lib/state/page'
	import type { PageData } from './$types'

	page.set({ title: 'My Moves' })

	export let data: PageData

	$: ({ session } = data)

	$: console.log('USER: ', session?.user)
</script>

{#if session?.user}
	<Moves user={session?.user} />
{/if}
