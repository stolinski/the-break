<script lang="ts">
	import { supabase } from '$lib/supa_client';
	import { user } from '$lib/state/session';
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
	<div>
		<label for="name">Name</label>
		<input id="name" type="text" bind:value={name} />
	</div>
	<div>
		<label for="value">Value</label>
		<input id="value" type="number" min={0} max={10} bind:value />
	</div>
	<div>
		<label for="type">Type</label>
		<select name="type" id="type" bind:value={type}>
			<option value="power">Power</option>
			<option value="footwork">Footwork</option>
			<option value="toprock">Toprock</option>
			<option value="freeze">Freeze</option>
		</select>
	</div>

	<div>
		<input
			type="submit"
			class="button block primary"
			value={loading ? 'Loading ...' : 'Add Move'}
			disabled={loading}
		/>
	</div>
</form>
