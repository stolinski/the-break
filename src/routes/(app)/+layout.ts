import type { UsersResponse } from '../../pocket-types'
import { pb } from '../../pocketbase'

export const ssr = false

export const load = async function ({ depends }) {
	depends('app:user')
	if (pb.authStore.isValid) await pb.collection('users').authRefresh()
	return {
		user: pb.authStore.isValid ? (pb.authStore.model as UsersResponse) : undefined
	}
}
