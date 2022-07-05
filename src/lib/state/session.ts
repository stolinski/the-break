import { supabase } from '$lib/supa_client';
import { writable } from 'svelte/store';

export const user = writable(false);

export function auth_check() {
	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session.user);
	});
}
