<script lang="ts">
	import { moves } from '$lib/state/moves';
	import MoveForm from '$lib/MoveForm.svelte';

	moves.loadMoves();

	let types = ['go-down', 'toprock', 'footwork', 'freeze', 'power'];
</script>

<MoveForm />

{#await $moves then data}
	{#each types as type}
		{@const filtered = data.filter((move) => move.type === type)}
		{@const typeName = type[0].toUpperCase() + type.slice(1)}
		<div class="move-type">
			<h3>{typeName}</h3>
			<div class="move-type-moves">
				{#if filtered.length === 0}
					<p>No {typeName} added yet.</p>
				{:else}
					{#each filtered as move}
						<div class="move-name">
							{move.name}<span class={`move-${move.value}`}>{move.value}</span>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	{/each}
{/await}

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
		color: black;
		font-weight: 900;
		border-radius: 10px;
	}

	.move-1,
	.move-2,
	.move-3 {
		background-color: blue;
	}
	.move-4,
	.move-5,
	.move-6 {
		background-color: green;
	}
	.move-7,
	.move-8,
	.move-9 {
		background-color: orange;
	}
	.move-10 {
		background-color: red;
	}
</style>
