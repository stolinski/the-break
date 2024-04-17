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

<p class="main_clock">
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

<div class="button-group">
	{#if timer_status === 'STOPPED' || timer_status === 'PAUSED'}
		<button class="go-btn" on:click={start}>Start</button>
	{/if}
	{#if timer_status === 'STOPPED' || timer_status === 'PAUSED'}
		<button class="warning-btn" on:click={stop}>Reset</button>
	{/if}
	{#if timer_status === 'RUNNING'}
		<button on:click={pause}>Pause</button>
	{/if}
</div>

<style>
	p {
		font-family: 'Space Mono', monospace;
		font-weight: 700;
		font-style: italic;
		line-height: 1;
		font-size: 120px;
		margin: 0 0 1.5rem;
	}
	span {
		font-size: 14px;
		display: block;
		font-family: 'Space Mono', monospace;
		font-weight: 400;
		font-style: normal;
		opacity: 0.8;
	}

	.main_clock {
		background: rgb(0 0 0 / 0.2);
		padding: 10px;
		border-radius: 15px;
		box-shadow: inset 0 1px 2px 1px rgb(0 0 0 / 0.3);
	}

	.secondary_data {
		font-size: 60px;
		opacity: 0.8;
	}

	.button-group {
		display: flex;
		margin-top: 1rem;
		gap: 20px;
		flex-direction: column;
	}
</style>
