const createBattleMoves = () => {
	const initial_moves = localStorage?.getItem('battle_moves')
	let battle_moves: string[] = $state(initial_moves ? JSON.parse(initial_moves) : [])

	function use(move_id: string) {
		// If there are no moves, create an empty array
		if (!battle_moves.includes(move_id)) {
			battle_moves.push(move_id)
			sync_with_local_storage()
		}
	}

	function reset() {
		battle_moves = []
		sync_with_local_storage()
	}

	function sync_with_local_storage() {
		localStorage.setItem('battle_moves', JSON.stringify(battle_moves))
	}

	return {
		reset,
		use,
		get moves() {
			return battle_moves
		}
	}
}

export const battle_moves = createBattleMoves()
