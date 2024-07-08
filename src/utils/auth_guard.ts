import { pb } from '$/pocketbase'
import type { UsersResponse } from '$/pocket-types'
import { goto } from '$app/navigation'

export function auth_guard() {
	let user: UsersResponse | undefined
	if (pb.authStore.isValid) {
		user = pb.authStore.model as UsersResponse
	} else {
		user = undefined
	}

	if (!user) {
		goto('/auth/login')
	}
}
