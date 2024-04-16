<script lang="ts">
	import { moves } from '$state/moves.svelte'
	import { fade } from 'svelte/transition'
	import MoveType from './MoveType.svelte'
	import { TYPES } from './const'
</script>

{#if moves?.moves}
	{#each TYPES as type}
		{@const filtered = moves?.moves.filter((move) => move.type === type)}
		{@const type_name = type[0].toUpperCase() + type.slice(1)}
		<div class="move-type">
			<MoveType {type_name} />

			<div class="move-type-moves">
				{#if filtered.length === 0}
					<p class="fade">No {type_name} Moves added yet.</p>
				{:else}
					{#each filtered as move (move.id)}
						<div class="move-name" transition:fade>
							{move.name}<span class={`move-${move.value}`}>{move.value}</span>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	{/each}
{/if}

<style>
	.fade {
		opacity: 0.4;
		text-align: center;
	}

	.move-type {
		border-bottom: solid 1px rgba(255, 255, 255, 0.1);
		margin: 1rem 0;
		padding: 1rem 0;
	}

	.move-type-moves {
		border-radius: 30px;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.move-name {
		border-radius: 15px;
		padding: 15px;
		background-color: rgba(255, 255, 255, 0.02);
		display: flex;
		justify-content: space-between;
	}

	.move-name span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		color: white;
		font-weight: 900;
		border-radius: 10px;
	}

	.move-1,
	.move-2,
	.move-3 {
		color: white;
	}
	.move-4,
	.move-5,
	.move-6 {
		color: green;
	}
	.move-7,
	.move-8,
	.move-9 {
		color: orange;
	}
	.move-10 {
		color: red;
	}
</style>
