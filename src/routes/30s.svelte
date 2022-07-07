<script lang="ts">
	import { writable } from 'svelte/store';
	import { page } from '$lib/state/page';

	page.set({ title: '30/30s' });

	let lapse = 0;
	let previous = 0;
	let interval: NodeJS.Timer;
	let state: 'RUNNING' | 'PAUSED' | 'STOPPED' = 'STOPPED';

	// set up a readable store which returns the number of milliseconds between the moment the store is subscribed and following an interval
	export const time = writable(0);

	function start() {
		state = 'RUNNING';
		interval = setInterval(() => {
			console.log('$time', $time);
			$time = $time + 1;
		}, 10);
	}

	function pause() {
		state = 'PAUSED';
		clearInterval(interval);
	}

	function stop() {
		state = 'STOPPED';
		// ! forcedly set the readable value to 0 before clearing the interval
		// it seems the store would otherwise retain the last value and the application would stagger from this value straight to 0
		$time = 0;
		clearInterval(interval);
	}
</script>

<h2>
	{$time / 100}
	{$time / 100 / 30}
</h2>

{#if state === 'STOPPED' || state === 'PAUSED'}
	<button on:click={start}>Start</button>
{/if}
{#if state === 'STOPPED' || state === 'PAUSED'}
	<button on:click={stop}>Reset</button>
{/if}
{#if state === 'RUNNING'}
	<button on:click={pause}>Pause</button>
{/if}

<style>
	h2 {
		font-family: monospace;
		font-size: 200px;
	}
</style>
