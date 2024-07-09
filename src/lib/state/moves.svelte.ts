import type { MovesResponse } from '../../pocket-types'
import { pb } from '../../pocketbase'
import { localDB } from '../local_db'

export interface Move {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	name: string
	props?: number
	type?: 'toprock' | 'footwork' | 'go-down' | 'freeze' | 'power' | 'burner'
	user?: string
	value?: number
	needsSync?: boolean
}

const typeOrder = {
	toprock: 1,
	'go-down': 2,
	footwork: 3,
	power: 4,
	freeze: 5
} as const

function createMoves() {
	let moves = $state<Move[]>()

	// Set up a more frequent sync interval
	setInterval(sync, 30 * 1000)
	// Listen for online/offline events
	window.addEventListener('online', sync)

	// Set up a real-time subscription if PocketBase supports it
	pb.collection('moves').subscribe('*', function (e) {
		if (e.action === 'create' || e.action === 'update') {
			localDB.moves.put({ ...e.record, needsSync: false })
			moves?.push(e.record)
		} else if (e.action === 'delete') {
			localDB.moves.delete(e.record.id)
		}
	})

	function remove(move_id: string) {
		moves = moves?.filter((move) => move.id !== move_id)
	}

	// SYNC METHODS
	async function load() {
		const userId = pb.authStore.model?.id
		if (!userId) {
			console.error('User not authenticated')
			return []
		}

		const localMoves = await localDB.moves.toArray()

		// If there is anything in the database
		if (localMoves.length > 0) {
			sync() // Trigger sync in background
			// Set local moves into state
			moves = localMoves
			return
		}

		try {
			const serverMoves = await pb.collection('moves').getFullList<Move>({
				sort: '-created'
			})

			await localDB.moves.bulkAdd(serverMoves.map((move) => ({ ...move, needsSync: false })))
			moves = serverMoves
			return moves
		} catch (error) {
			console.error('Failed to fetch moves from server:', error)
			return []
		}
	}

	async function sync() {
		console.log('syncing moves...')
		if (!navigator.onLine) return

		const unsyncedMoves = await localDB.moves.filter((move) => move.needsSync === true).toArray()

		for (const move of unsyncedMoves) {
			try {
				if (move.id.startsWith('local_')) {
					const { needsSync, id, ...moveData } = move

					const server_move = await pb.collection('moves').create<Move>(moveData)
					await localDB.moves.delete(move.id)
					await localDB.moves.add({
						...server_move,
						needsSync: false
					})
				} else {
					const { needsSync, ...moveData } = move
					await pb.collection('moves').update<Move>(move.id, moveData)
					await localDB.moves.update(move.id, { needsSync: false })
				}
			} catch (error) {
				console.error(`Failed to sync move ${move.id}:`, error)
			}
		}
	}

	async function save(move: Partial<Move>) {
		console.log('saving...', move.name)
		const now = new Date()
		const updatedMove: Move = {
			...move,
			updated: now.toISOString(),
			needsSync: true,
			id: move.id || `local_${Date.now()}`
		} as Move // Type assertion to satisfy TypeScript

		await localDB.moves.put(updatedMove)
		sync() // Attempt to sync immediately
	}

	return {
		load,
		get moves() {
			return moves
		},
		remove,
		// SYNC METHODS
		save,
		sync
	}
}

export const moves = createMoves()
