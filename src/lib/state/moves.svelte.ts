import type { MovesResponse } from '../../pocket-types'
import { pb } from '../../pocketbase'

function createMoves() {
	let moves = $state<MovesResponse[]>()

	async function load() {
		moves = await pb.collection('moves').getFullList({
			sort: '-created'
		})
	}

	function add_move(move: MovesResponse) {
		moves?.push(move)
	}

	function remove_move(move_id: string) {
		moves = moves?.filter((move) => move.id !== move_id)
	}

	return {
		load,
		get moves() {
			return moves
		},
		add_move,
		remove_move
	}
}

export const moves = createMoves()
