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
	<div class="move-bg">Use Move</div>
</div>

<style>
	.move-wrapper {
		position: relative;
	}

	.move {
		border-bottom: solid 1px rgba(255, 255, 255, 0.1);
		padding: 10px;
		z-index: 10;
		background-color: var(--bg);
	}

	.move-bg {
		box-shadow: var(--inner-shadow-3);
		text-shadow: var(--shadow-1);
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		background: var(--red-6);
	}
</style>
