import { writable } from 'svelte/store';

const ls = typeof localStorage !== 'undefined';

const battleMoves = () => {
	const starting_moves = ls ? JSON.parse(localStorage.getItem('battle_moves')) : [];

	const { subscribe, update, set } = writable(starting_moves);

	function addBattleMove(move_id: string) {
		console.log('move_id', move_id);
		let current_moves = JSON.parse(localStorage.getItem('battle_moves')) || [];
		console.log('current_moves', current_moves);
		// If there are no moves, create an empty array
		if (current_moves.length === 0) {
			current_moves = [move_id];
		} else if (!current_moves.includes(move_id)) {
			current_moves = [...current_moves, move_id];
		}
		localStorage.setItem('battle_moves', JSON.stringify(current_moves));
		set(current_moves);
	}

	function reset() {
		set([]);
		localStorage.setItem('battle_moves', JSON.stringify([]));
	}

	return { subscribe, update, set, addBattleMove, reset };
};

export const battle_moves = battleMoves();
