import type { MovesResponse } from '../../pocket-types'
import { pb } from '../../pocketbase'

const typeOrder = {
	toprock: 1,
	'go-down': 2,
	footwork: 3,
	power: 4,
	freeze: 5
} as const

function createMoves() {
	let moves = $state<MovesResponse[]>()

	async function load() {
		moves = await pb.collection('moves').getFullList({
			sort: '-created'
		})
		moves.sort((a, b) => {
			const typeA = typeOrder[a.type]
			const typeB = typeOrder[b.type]
			return typeA - typeB
		})
	}

	function add(move: MovesResponse) {
		moves?.push(move)
	}

	function remove(move_id: string) {
		moves = moves?.filter((move) => move.id !== move_id)
	}

	return {
		load,
		get moves() {
			return moves
		},
		add,
		remove
	}
}

export const moves = createMoves()
