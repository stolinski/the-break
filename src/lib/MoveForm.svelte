<script lang="ts">
	import { supabase } from '$lib/supa_client';
	import { moves } from '$lib/state/moves';

	let loading = false;
	let name: string = '';
	let type: string = '';
	let value: number = 0;

	async function addMove() {
		try {
			loading = true;
			const user = supabase.auth.user();

			const updates = {
				user_id: user.id,
				name,
				type,
				value
			};

			let { error } = await supabase.from('moves').upsert(updates, {
				returning: 'minimal' // Don't return the value after inserting
			});

			await moves.loadMoves();

			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<form class="form-widget" on:submit|preventDefault={addMove}>
	<div class="row">
		<label for="name">Name</label>
		<input id="name" type="text" bind:value={name} />
	</div>
	<div class="row">
		<label for="value">Value</label>
		<input id="value" type="number" min={0} max={10} bind:value />
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

<style>
	.form-widget {
		border: solid 1px rgba(255, 255, 255, 0.1);
		border-radius: 15px;
		padding: 15px;
		max-width: 600px;
	}

	.row {
		margin-bottom: 15px;
	}

	.row-submit {
		border-top: solid 1px rgba(255, 255, 255, 0.1);
		padding-top: 10px;
	}
</style>
