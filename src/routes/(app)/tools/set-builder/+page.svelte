<script lang="ts">
	import { page } from '$lib/state/page'
	import { moves } from '$state/moves.svelte'
	import type { MovesResponse } from '../../../pocket-types'

	let sets: Array<MovesResponse[]> = $state([])
	let distribution: { [key: string]: number } = $state({})
	let possible_distribution = $state({})
	let how_many_sets = $state(5)
	let status: 'INITIAL' | 'BUILDING' | 'DONE' = $state('INITIAL')

	page.set({ title: 'Set Builder' })

	function reset() {
		status = 'INITIAL'
		sets = []
	}

	function generate() {
		status = 'BUILDING'

		distribution = moves?.moves?.reduce((prev: { [key: string]: number }, curr: MovesResponse) => {
			// fix hypenated property name
			prev[curr.type] = prev[curr.type] ? prev[curr.type] + 1 : 1
			return prev
		}, {})

		// Determine how many of each move.type will distribute into sets
		possible_distribution = Object.keys(distribution).reduce((prev, curr) => {
			prev[curr] = distribution[curr] / how_many_sets
			return prev
		}, {})

		// Generate sets of x as move.value equal value amounts with an equal distribution of move.types
		let sets_index = 0
		moves?.moves.forEach((move) => {
			// increment sets_index but have it max out at 5
			if (sets_index < how_many_sets) {
				if (sets[sets_index]) {
					sets[sets_index].push(move)
				} else {
					sets[sets_index] = [move]
				}
				sets_index++
			} else {
				sets_index = 0
			}
		})
		status = 'DONE'
	}
</script>

<p>CAUTION: This is not complete and just a basic implementation</p>

{#if status === 'INITIAL'}
	<div class="row">
		<label for="sets"></label><input bind:value={how_many_sets} type="number" />
	</div>
	<div class="row"><button onclick={generate}>Generate</button></div>
{:else if status === 'DONE'}
	<div class="row"><button onclick={reset}>Reset</button></div>
{/if}

{#each sets as set, i}
	<h3>Set #{i + 1}</h3>
	<ul>
		{#each set as move}
			<li>
				{move.name} - {move.type}
			</li>
		{/each}
	</ul>
{/each}
