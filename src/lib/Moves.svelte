<script lang="ts">
	import { moves } from '$lib/state/moves'
	export let user

	moves.loadMoves(user)

	let types = ['toprock', 'go-down', 'footwork', 'freeze', 'power']
</script>

{#await $moves then data}
	{#each types as type}
		{@const filtered = data.filter((move) => move.type === type)}
		{@const typeName = type[0].toUpperCase() + type.slice(1)}
		<div class="move-type">
			<h3 class={typeName.toLocaleLowerCase()}><span>{typeName.charAt(0)}</span> {typeName}</h3>
			<div class="move-type-moves">
				{#if filtered.length === 0}
					<p class="fade">No {typeName} Moves added yet.</p>
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
	h3 {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.footwork span {
		background-color: var(--footwork_color);
		color: #000;
	}
	.toprock span {
		background-color: var(--toprock_color);
	}
	.freeze span {
		background-color: var(--freeze_color);
	}
	.power span {
		background-color: var(--power_color);
	}

	h3 span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		color: white;
		font-weight: 900;
		border-radius: 30px;
		background-color: green;
	}

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
