import { writable } from 'svelte/store'

interface State {
	new_move: {
		status: 'OPEN' | 'CLOSED'
	}
}

const default_state: State = {
	new_move: {
		status: 'CLOSED'
	}
}

const new_state = () => {
	const { subscribe, update, set } = writable<State>(default_state)

	function toggle_new_move() {
		update((state) => {
			state.new_move.status = state.new_move.status === 'OPEN' ? 'CLOSED' : 'OPEN'
			return state
		})
	}

	return { subscribe, update, set, toggle_new_move }
}

export const state = new_state()
