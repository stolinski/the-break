<script>
	import Moves from '$lib/Moves.svelte';
	import { page } from '$lib/state/page';

	page.set({ title: 'My Moves' });
</script>

<Moves />
