import PocketBase from 'pocketbase'

import type { TypedPocketBase } from './pocket-types'

export const pb = new PocketBase('https://api.thebreak.app') as TypedPocketBase
