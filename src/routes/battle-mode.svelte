<script lang="ts">
	import { page } from '$lib/state/page'
	import { battle_moves } from '$lib/state/battle_moves'
	import BattleMove from '$lib/BattleMove.svelte'
	import { slide } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	page.set({ title: 'Battle Mode' })

	let types = ['go-down', 'toprock', 'footwork', 'freeze', 'power']
</script>

<!-- 
{#await $moves then data}
	{#each types as type (type)}
		<h3>{type}</h3>
		<div class="move-type-moves">
			{#each data
				.filter((move) => move.type === type)
				.filter((move) => !$battle_moves.includes(move.id)) as move (move.id)}
				<div animate:flip out:slide>
					<BattleMove {move} />
				</div>
			{/each}
		</div>
	{/each}
{/await} -->

<button on:click={battle_moves.reset}>Reset</button>

<style>
	.move-type-moves {
		border-radius: 30px;
		box-shadow: var(--shadow-3);
		padding: 15px;
		background-color: rgba(255, 255, 255, 0.02);
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	button {
		margin-top: 60px;
		color: var(--white);
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
