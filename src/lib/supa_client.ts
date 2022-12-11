import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'
console.log('PUBLIC_SUPABASE_ANON_KEY', env.PUBLIC_SUPABASE_ANON_KEY)

export const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)
