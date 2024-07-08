<script lang="ts">
	import MoveForm from '$lib/MoveForm.svelte'
	import Moves from '$lib/Moves.svelte'
	import { page } from '$lib/state/page'
	import { state } from '$state/state'

	page.set({ title: 'My Moves' })
</script>

<button on:click|preventDefault={state.toggle_new_move}>
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
		width="15"
		height="auto"
	>
		<g>
			<path
				fill="white"
				d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"
			/>
		</g>
	</svg>
	Add Move
</button>

<MoveForm />
<Moves />
