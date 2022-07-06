<script lang="ts">
	import { moves } from '$lib/state/moves';
	import { page } from '$lib/state/page';
	import { battle_moves } from '$lib/state/battle_moves';
	import BattleMove from '$lib/BattleMove.svelte';
	import { flip } from 'svelte/animate';
	page.set({ title: 'Battle Tools' });

	moves.loadMoves();

	let types = ['footwork', 'toprock', 'freeze', 'power'];
</script>

{#await $moves then data}
	{#each types as type}
		<h3>{type}</h3>
		{#each data
			.filter((move) => move.type === type)
			.filter((move) => !$battle_moves.includes(move.id)) as move (move.id)}
			<div animate:flip>
				<BattleMove {move} />
			</div>
		{/each}
	{/each}
{/await}

<button on:click={battle_moves.reset}>Reset</button>

<style>
	button {
		color: #eee;
		background: blue;
		box-shadow: var(--shadow-3);
		border: none;
		font-weight: bold;
		border-radius: 8px;
		font-size: 18px;
		width: 100%;
		padding: 10px;
	}
</style>
