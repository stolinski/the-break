<script lang="ts">
	import { moves } from '$lib/state/moves';

	moves.loadMoves();

	let types = ['footwork', 'toprock', 'freeze', 'power'];
</script>

{#await $moves then data}
	{#each types as type}
		<h3>{type}</h3>
		{#each data.filter((move) => move.type === type) as move}
			<div class="move">
				<div class="move-name">{move.name}<button>Use Move</button></div>
			</div>
		{/each}
	{/each}
{/await}
