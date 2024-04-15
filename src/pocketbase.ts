import PocketBase from 'pocketbase'

import type { TypedPocketBase } from './pocket-types'

export const pb = new PocketBase(
	'http://pocketbase-kcs4o04.128.199.5.88.sslip.io'
) as TypedPocketBase
