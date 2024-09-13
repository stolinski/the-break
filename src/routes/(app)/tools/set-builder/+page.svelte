<script lang="ts">
	import type { MovesResponse } from '$/pocket-types'
	import { pb } from '$/pocketbase'
	import { moves } from '$state/moves.svelte'
	import {
		SortableList,
		sortItems,
		type SortableListProps
	} from '@rodrigodagostino/svelte-sortable-list'

	let items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
	let listContainer: HTMLDivElement = $state(null!)

	type DanceSet = {
		id?: string
		name: string
		moves: string[]
		expand: {
			moves: MovesResponse[]
		}
	}

	let sets: DanceSet[] = $state([])
	let drawer: HTMLDialogElement | null = $state(null)
	let selectedSetIndex: number | null = $state(null)
	let used_moves = $derived(
		sets
			.map((set) => set?.expand?.moves)
			.flat()
			.map((move) => move?.id)
	)

	$effect(() => {
		loadSets()
	})

	function handleSort(event: CustomEvent, index: number) {
		const { prevIndex, nextIndex } = event.detail
		sets[index].expand.moves = sortItems(
			$state.snapshot(sets[index].expand.moves),
			prevIndex,
			nextIndex
		)
	}

	async function loadSets() {
		try {
			const loadedSets = await pb.collection('sets').getFullList<DanceSet>({
				sort: 'created',
				expand: 'moves'
			})
			sets = loadedSets
		} catch (error) {
			console.error('Failed to load sets:', error)
		}
	}

	async function saveSet(set: DanceSet) {
		try {
			if (set.id) {
				await pb.collection('sets').update(set.id, {
					name: set.name,
					moves: set.expand.moves.map((move) => move.id),
					user: pb.authStore.model?.id
				})
			} else {
				const newSet = await pb.collection('sets').create({
					name: set.name,
					moves: [],
					user: pb.authStore.model?.id
				})
				set.id = newSet.id
			}
		} catch (error) {
			console.error('Failed to save set:', error)
		}
	}

	function openDrawer(index: number) {
		selectedSetIndex = index
		drawer?.showModal()
	}

	function closeDrawer() {
		drawer?.close()
	}

	async function addMoveToSet(move: MovesResponse) {
		if (selectedSetIndex !== null) {
			if (!sets[selectedSetIndex]?.expand?.moves) {
				sets[selectedSetIndex] = {
					...sets[selectedSetIndex],
					expand: { moves: [] }
				}
			}
			sets[selectedSetIndex].expand.moves = [
				...sets[selectedSetIndex].expand.moves,
				$state.snapshot(move)
			]
			sets = [...sets] // Trigger reactivity
			await saveSet(sets[selectedSetIndex])
		}
	}

	async function removeMoveFromSet(move: MovesResponse, setIndex: number) {
		sets[setIndex].expand.moves = sets[setIndex].expand.moves.filter((m) => m.id !== move.id)
		sets = [...sets] // Trigger reactivity
		await saveSet(sets[setIndex])
	}

	async function addSet() {
		const newSet: DanceSet = { name: `Set ${sets.length + 1}`, moves: [] }
		sets.push(newSet)
		await saveSet(newSet)
	}
</script>

<!-- An add button that creates a new set -->
<button onclick={addSet}>Add Set</button>

{#each sets as set, index ('set-builder-set-' + index)}
	<div>
		<h3>{set.name}</h3>
		<button onclick={() => openDrawer(index)}>Add Moves</button>

		{#if set?.expand?.moves}
			<div class="row">
				<SortableList items={set?.expand?.moves} let:item on:sort={(e) => handleSort(e, index)}>
					<div class={'move-bubble ' + item.type.toLocaleLowerCase()}>
						<span>{item.type.charAt(0)}</span>{item.name}
						<button class="small warning-btn" onclick={() => removeMoveFromSet(item, index)}
							>Remove</button
						>
					</div>
				</SortableList>
			</div>
		{/if}
	</div>
{/each}

<dialog bind:this={drawer}>
	<div class="drawer-content">
		<h2>Add Moves to Set</h2>
		<button class="close-btn" onclick={closeDrawer}>×</button>
		<ul>
			{#each moves?.moves as move}
				{#if !used_moves.includes(move.id)}
					<li>
						<div class={'move-bubble ' + move.type.toLocaleLowerCase()}>
							<span>{move.type.charAt(0)}</span>{move.name}
						</div>
						<button class="small" onclick={() => addMoveToSet(move)}>Add</button>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
</dialog>

<style>
	:is(.footwork, .toprock, .freeze, .power, .move-bubble) {
		display: flex;
		align-items: center;
		gap: 10px;
		span {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 30px;
			height: 30px;
			text-transform: uppercase;
			color: white;
			font-weight: 900;
			border-radius: 30px;
			background-color: green;
		}
		button {
			margin-left: auto;
		}
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
	dialog {
		width: 100%;
		inset: auto 0 0 0;
		height: 50%;
		max-width: 95vi;
		border: none;
		border-radius: 8px;
		padding: 12px;
		background-color: var(--bg);
		color: var(--color);
		box-shadow:
			0.5px 0.8px 1.1px hsl(var(--shadow-color) / 0.3),
			2.7px 4.4px 5.8px -0.4px hsl(var(--shadow-color) / 0.3),
			4.9px 8px 10.6px -0.7px hsl(var(--shadow-color) / 0.3),
			8.1px 13.1px 17.3px -1.1px hsl(var(--shadow-color) / 0.3),
			12.9px 20.9px 27.6px -1.4px hsl(var(--shadow-color) / 0.3),
			20.1px 32.7px 43.2px -1.8px hsl(var(--shadow-color) / 0.3),
			30.6px 49.7px 65.7px -2.1px hsl(var(--shadow-color) / 0.3),
			45px 73.1px 96.6px -2.5px hsl(var(--shadow-color) / 0.3);
	}

	.drawer-content {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
	.close-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		border-color: var(--red);
		width: 30px;
		height: 30px;
		color: var(--red);
		top: 10px;
		right: 10px;
		margin-left: auto;
		background: none;
		box-shadow: none;
	}
</style>
