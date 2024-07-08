<script lang="ts">
	import { app_guard } from '$utils/app_guard'
	import { moves } from '$state/moves.svelte'

	const { children } = $props()
	moves.load()

	$effect.pre(app_guard);
</script>


{@render children()}