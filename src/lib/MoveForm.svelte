<script lang="ts">
	import { user } from '$lib/state/session'
	import { state } from '$lib/state/state'
	import { supabase } from '$lib/supa_client'
	import { moves } from '$lib/state/moves'
	import { fly } from 'svelte/transition'

	let loading = false
	let name: string = ''
	let type: string = ''
	let value: number = 0

	async function addMove() {
		try {
			loading = true

			const updates = {
				user_id: $user.id,
				name,
				type,
				value
			}

			let { error } = await supabase.from('moves').upsert(updates, {
				returning: 'minimal' // Don't return the value after inserting
			})

			await moves.loadMoves($user)

			if (error) throw error
		} catch (error) {
			alert(error.message)
		} finally {
			state.toggle_new_move()
			loading = false
		}
	}
</script>

{#if $state.new_move.status === 'OPEN'}
	<div class="wrapper" transition:fly={{ y: 600 }}>
		<button on:click={state.toggle_new_move}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				version="1.1"
				id="Capa_1"
				x="0px"
				y="0px"
				viewBox="0 0 512 512"
				style="enable-background:new 0 0 512 512;"
				xml:space="preserve"
				width="24"
				height="auto"
			>
				<g>
					<path
						fill="white"
						d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"
					/>
				</g>
			</svg>
		</button>

		<form class="form-widget" on:submit|preventDefault={addMove}>
			<h2>New Move</h2>
			<div class="row">
				<label for="name">Name</label>
				<input id="name" type="text" bind:value={name} />
			</div>
			<div class="row">
				<label for="value">Move Strength / Value</label>
				<p>{value}</p>
				<input type="range" name="" id="" min={0} max={10} bind:value />
			</div>
			<div class="row">
				<label for="type">Type</label>
				<select name="type" id="type" bind:value={type}>
					<option value="go-down">Go Down</option>
					<option value="toprock">Toprock</option>
					<option value="footwork">Footwork</option>
					<option value="power">Power</option>
					<option value="freeze">Freeze</option>
				</select>
			</div>

			<div class="row-submit">
				<input
					type="submit"
					class="button block primary"
					value={loading ? 'Loading ...' : 'Add Move'}
					disabled={loading}
				/>
			</div>
		</form>
	</div>
{/if}

<style>
	.wrapper {
		position: fixed;
		inset: 0;
		background: #111;
		z-index: 20;
	}

	.form-widget {
		border-radius: 15px;
		padding: 15px;
		display: flex;
		flex-direction: column;
		max-width: 600px;
		gap: 15px;
		height: 100%;
		padding-top: 50px;
	}

	.row-submit {
		margin-top: auto;
		border-top: solid 1px rgba(255, 255, 255, 0.1);
		padding-top: 10px;
	}

	button {
		display: block;
		padding: 10px;
		margin: 10px;
		position: absolute;
		top: 0;
		right: 0;
		margin-left: auto;
		background: none;
		box-shadow: none;
	}

	button svg {
		rotate: 45deg;
	}
</style>
