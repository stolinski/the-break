import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
	const data = await getServerSession(event);
	console.log('data', data);
	return {
		session: await getServerSession(event)
	};
};
