<script lang="ts">
	import { page } from '$lib/state/page'

	page.set({ title: '30/30s' })

	let laps = $state(0)
	let rest = $state(0)
	let interval: NodeJS.Timer
	let timer_status: 'RUNNING' | 'PAUSED' | 'STOPPED' = $state('STOPPED')
	let rest_status: 'REST' | 'DANCE' = $state('DANCE')

	// set up a readable store which returns the number of milliseconds between the moment the store is subscribed and following an interval
	let time = $state(0)
	let total = $derived((time + (laps + rest) * (30 * 100)) / 100)
	const AUDIO = new Audio('/airhorn.mp3')

	function start() {
		timer_status = 'RUNNING'
		interval = setInterval(() => {
			if (time >= 3000) {
				if (laps > rest) {
					rest = rest + 1
					rest_status = 'DANCE'
				} else {
					laps = laps + 1
					rest_status = 'REST'
				}
				time = 0
				AUDIO.play()
			}
			time = time + 1
		}, 10)
	}

	function pause() {
		timer_status = 'PAUSED'
		clearInterval(interval)
	}

	function stop() {
		timer_status = 'STOPPED'
		// ! forcedly set the readable value to 0 before clearing the interval
		// it seems the store would otherwise retain the last value and the application would stagger from this value straight to 0
		time = 0
		clearInterval(interval)
	}
</script>

<p>
	<span>Current Round</span>
	{time / 100}
</p>

<p class="secondary_data">
	<span>Percentage of Current Round</span>
	{(100 * (time / 100 / 30)).toFixed(0)}%
</p>

<p class="secondary_data">
	<span>Total Rounds</span>
	{laps}
</p>
<p class="secondary_data">
	<span>Total Time</span>
	{total}
</p>

<p class="secondary_data">
	<span>Status</span>
	{rest_status}
</p>

{#if timer_status === 'STOPPED' || timer_status === 'PAUSED'}
	<button on:click={start}>Start</button>
{/if}
{#if timer_status === 'STOPPED' || timer_status === 'PAUSED'}
	<button on:click={stop}>Reset</button>
{/if}
{#if timer_status === 'RUNNING'}
	<button on:click={pause}>Pause</button>
{/if}

<style>
	p {
		font-family: monospace;
		font-size: 120px;
		margin: 0;
	}
	span {
		font-size: 14px;
		display: block;
	}

	.secondary_data {
		font-size: 60px;
	}
</style>
