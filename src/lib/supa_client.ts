import { createClient } from '@supabase/auth-helpers-sveltekit'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
console.log('PUBLIC_SUPABASE_ANON_KEY', PUBLIC_SUPABASE_ANON_KEY)

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
