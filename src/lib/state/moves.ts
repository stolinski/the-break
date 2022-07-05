import { supabase } from '$lib/supa_client';
import { writable, get } from 'svelte/store';
import { user } from './session';

const newMoves = () => {
	const { subscribe, update, set } = writable([]);

	async function loadMoves() {
		const current_user = get(user);

		const { data, error } = await supabase
			.from('moves')
			.select(`name, value, type`)
			.eq('user_id', current_user.id);

		if (error) throw error;

		set(data);
	}

	return { subscribe, update, set, loadMoves };
};

export const moves = newMoves();
