import { writable } from 'svelte/store';

const battleMoves = () => {
	const { subscribe, update, set } = writable([]);

	return { subscribe, update, set };
};

export const battle_moves = battleMoves();
