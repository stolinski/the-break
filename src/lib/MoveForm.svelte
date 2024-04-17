<script lang="ts">
	import { state } from '$lib/state/state'
	import { fly } from 'svelte/transition'
	import { pb } from '../pocketbase'
	import { moves } from '$state/moves.svelte'

	let loading = false
	let name: string = ''
	let type: string = ''
	let value: number = 0

	async function addMove() {
		loading = true
		const move = await pb
			.collection('moves')
			.create({
				name,
				type,
				value,
				user: pb.authStore.model?.id
			})
			.catch((error) => console.log(error))
			.finally(() => {
				state.toggle_new_move()
				loading = false
			})
		if (move) {
			moves.add(move)
		}
	}
</script>

{#if $state.new_move.status === 'OPEN'}
	<div class="wrapper" transition:fly={{ y: 600 }}>
		<button on:click={state.toggle_new_move}>×</button>

		<form class="form-widget" on:submit|preventDefault={addMove}>
			<h2>New Move</h2>
			<div class="row">
				<label for="name">Name</label>
				<input id="name" type="text" bind:value={name} />
			</div>
			<div class="row">
				<label for="value">Move Strength / How many props you get</label>
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
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		border-color: var(--red);
		width: 30px;
		height: 30px;

		top: 10px;
		right: 10px;
		margin-left: auto;
		background: none;
		box-shadow: none;
	}
</style>
