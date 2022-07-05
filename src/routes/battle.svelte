<script lang="ts">
	import { moves } from '$lib/state/moves';
	import { battle_moves } from '$lib/state/battle_moves';

	moves.loadMoves();

	let types = ['footwork', 'toprock', 'freeze', 'power'];
</script>

{#await $moves then data}
	{#each types as type}
		<h3>{type}</h3>
		{#each data
			.filter((move) => move.type === type)
			.filter((move) => !$battle_moves.includes(move.id)) as move}
			<div class="move">
				<div class="move-name">
					{move.name}<button on:click={() => battle_moves.addBattleMove(move.id)}>Use Move</button>
				</div>
			</div>
		{/each}
	{/each}
{/await}

<button on:click={battle_moves.reset}>Reset</button>
