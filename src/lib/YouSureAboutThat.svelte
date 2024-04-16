<script lang="ts">
	import { fade } from 'svelte/transition'

	const {
		onclick,
		attempts = 2,
		action_text,
		action_class = 'warning-btn',
		...rest
	}: {
		onclick: () => unknown
		attempts?: number
		action_text: string
		action_class?: string
	} = $props()

	let attempt_count = $state(0)
	let remaining = $derived(attempts - attempt_count)
	let one_more_left = $derived(remaining === 1)

	function attempt() {
		if (one_more_left) {
			onclick()
			attempt_count = 0
		} else {
			attempt_count += 1
		}
	}
</script>

<button {rest} onclick={attempt} class={one_more_left ? action_class : ''}>Reset</button>
<p>
	&nbsp;
	{#if attempt_count !== 0}
		<span transition:fade>
			Are you sure? Press {action_text}
			{remaining} more time{one_more_left ? '' : 's'}.
		</span>
	{/if}
</p>
