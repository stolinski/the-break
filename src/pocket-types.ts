/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Moves = "moves",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum MovesTypeOptions {
	"toprock" = "toprock",
	"footwork" = "footwork",
	"go-down" = "go-down",
	"freeze" = "freeze",
	"power" = "power",
	"burner" = "burner",
}
export type MovesRecord = {
	name?: string
	props?: number
	type?: MovesTypeOptions
	user?: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type MovesResponse<Texpand = unknown> = Required<MovesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	moves: MovesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	moves: MovesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'moves'): RecordService<MovesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
