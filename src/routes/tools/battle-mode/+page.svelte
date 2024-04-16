<script lang="ts">
	import { page } from '$lib/state/page'
	import { battle_moves } from '$state/battle_moves.svelte'
	import BattleMove from '$lib/BattleMove.svelte'
	import { slide } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { moves } from '$state/moves.svelte'
	import { TYPES } from '$lib/const'
	import MoveType from '$lib/MoveType.svelte'
	import YouSureAboutThat from '$lib/YouSureAboutThat.svelte'
	page.set({ title: 'Battle Mode' })
</script>

<YouSureAboutThat action_text="Reset" onclick={battle_moves.reset} />

{#if moves?.moves}
	{#each TYPES as type (type)}
		{@const filtered = moves?.moves
			?.filter((move) => move.type === type)
			.filter((move) => !battle_moves.moves.includes(move.id))}
		{@const type_name = type[0].toUpperCase() + type.slice(1)}
		<MoveType {type_name} />
		<div class="move-type-moves">
			{#if filtered?.length === 0}
				<p class="fade">All {type_name}s used</p>
			{:else}
				{#each filtered as move (move.id)}
					<div animate:flip out:slide>
						<BattleMove {move} />
					</div>
				{/each}
			{/if}
		</div>
	{/each}
{/if}

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
	.move-type-moves p {
		text-align: center;
	}

	button {
		width: 100%;
		border-color: var(--red);
	}
</style>
