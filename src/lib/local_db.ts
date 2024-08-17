import Dexie from 'dexie'
import type { Move } from '$state/moves.svelte'

class LocalDB extends Dexie {
	moves: Dexie.Table<Move, string>

	constructor() {
		super('MovesDB')
		this.version(1).stores({
			moves: 'id, name, props, type, user, value, needsSync'
		})
		this.moves = this.table('moves')
	}
}
export const localDB = new LocalDB()
