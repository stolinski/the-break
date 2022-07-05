<script lang="ts">
	import { moves } from '$lib/state/moves';
	import MoveForm from '$lib/MoveForm.svelte';

	moves.loadMoves();

	let types = ['footwork', 'toprock', 'freeze', 'power'];
</script>

<MoveForm />

{#await $moves then data}
	{#each types as type}
		<h3>{type}</h3>
		{#each data.filter((move) => move.type === type) as move}
			<div class="move">
				<div class="move-name">{move.name} - {move.value}</div>
			</div>
		{/each}
	{/each}
{/await}
