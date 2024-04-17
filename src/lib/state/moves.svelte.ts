import type { MovesResponse } from '../../pocket-types'
import { pb } from '../../pocketbase'

function createMoves() {
	let moves = $state<MovesResponse[]>()

	async function load() {
		moves = await pb.collection('moves').getFullList({
			sort: '-created'
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
