<script lang="ts">
	import { draggable } from '@neodrag/svelte';
	import { battle_moves } from '$lib/state/battle_moves';
	let x = 0;
	export let move;
</script>

<div class="move-wrapper">
	<div
		class="move"
		use:draggable={{ position: { x }, axis: 'x' }}
		on:neodrag={(e) => {
			x = e.detail.offsetX;
		}}
		on:neodrag:end={(e) => {
			if (Math.abs(e.detail.offsetX) > 150) {
				battle_moves.addBattleMove(move.id);
			}
			x = 0;
		}}
	>
		{move.name}
	</div>
	<div class="move-bg"><span>Use Move</span><span>Use Move</span></div>
</div>

<style>
	.move-wrapper {
		position: relative;
		border-radius: 15px;
		overflow: hidden;
	}

	.move {
		z-index: 10;
		background-color: #151412;
		padding: 15px;
		display: flex;
		justify-content: space-between;
	}

	.move-bg {
		box-shadow: var(--inner-shadow-3);
		text-shadow: var(--shadow-1);
		position: absolute;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 10px;
		top: 0;
		border-radius: 15px;
		left: 0;
		z-index: -1;
		background: var(--red-6);
	}
</style>
