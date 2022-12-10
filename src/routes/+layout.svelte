<script lang="ts">
	import { page as skpage } from '$app/stores'
	import '$lib/style.css'
	import { page } from '$lib/state/page'
	import Auth from '$lib/Auth.svelte'
	import type { PageData } from './$types'
	import MoveForm from '$lib/MoveForm.svelte'
	import { supabase } from '$lib/supa_client'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { state } from '$lib/state/state'

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth')
		})

		return () => {
			subscription.unsubscribe()
		}
	})

	export let data: PageData
	$: ({ session } = data)
</script>

<div class="container">
	<header>
		<h1>{$page.title}</h1>
		<nav>
			<a class:active={$skpage.url.pathname === '/'} href="/">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="Layer_1"
					data-name="Layer 1"
					viewBox="0 0 24 24"
					width="24"
					height="auto"
					><path
						fill="white"
						d="M22.024,2.278A5.5,5.5,0,0,0,17.477,1.1l-3.283.688A4.487,4.487,0,0,0,12,2.854,4.4,4.4,0,0,0,9.845,1.792l-3.361-.7A5.5,5.5,0,0,0,0,6.5v9.792A5.492,5.492,0,0,0,4.493,21.7L10.3,22.847A9.431,9.431,0,0,0,11.994,23a9.658,9.658,0,0,0,1.728-.157L19.484,21.7A5.5,5.5,0,0,0,24,16.293V6.5A5.487,5.487,0,0,0,22.024,2.278ZM10.5,19.829,5.053,18.753A2.5,2.5,0,0,1,3,16.293V6.5A2.507,2.507,0,0,1,5.494,4a2.285,2.285,0,0,1,.414.037l3.361.7A1.5,1.5,0,0,1,10.5,6.212ZM21,16.293a2.506,2.506,0,0,1-2.075,2.464L13.5,19.829V6.212a1.511,1.511,0,0,1,1.271-1.483l3.282-.687A2.5,2.5,0,0,1,21,6.5Z"
					/></svg
				>

				Moves
			</a>
			<a href="#" on:click|preventDefault={state.toggle_new_move}>
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
				Add Move
			</a>
			<a class:active={$skpage.url.pathname === '/tools'} href="/tools">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="Layer_1"
					data-name="Layer 1"
					viewBox="0 0 24 24"
					width="24"
					height="auto"
					><path
						fill="white"
						d="M23,12.5A1.5,1.5,0,0,1,21.5,14H18.63a3.516,3.516,0,0,1-3-1.7l-1.225-2.034-1.79,4.363,2.614,1.487A3.507,3.507,0,0,1,17,19.163V22.5a1.5,1.5,0,0,1-3,0V19.163a.5.5,0,0,0-.252-.434L9.666,16.406a3.511,3.511,0,0,1-1.427-4.322L9.5,9H7.736a.5.5,0,0,0-.447.277L5.842,12.171a1.5,1.5,0,0,1-2.684-1.342L4.605,7.935A3.483,3.483,0,0,1,7.736,6H13.36a3.516,3.516,0,0,1,3,1.7L18.2,10.758A.5.5,0,0,0,18.63,11H21.5A1.5,1.5,0,0,1,23,12.5ZM8.057,16.85a1.5,1.5,0,0,0-1.95.836A.5.5,0,0,1,5.643,18H3.5a1.5,1.5,0,0,0,0,3H5.643a3.484,3.484,0,0,0,3.25-2.2A1.5,1.5,0,0,0,8.057,16.85ZM14.5,5A2.5,2.5,0,1,0,12,2.5,2.5,2.5,0,0,0,14.5,5Z"
					/></svg
				>
				Tools</a
			>
			<a class:active={$skpage.url.pathname === '/profile'} href="/profile">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="Outline"
					viewBox="0 0 24 24"
					width="24"
					height="auto"
					><path
						fill="white"
						d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"
					/><path
						fill="white"
						d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z"
					/></svg
				>
				Settings</a
			>
		</nav>
	</header>

	<main>
		{#if session?.user}
			<slot />
			<MoveForm />
		{:else}
			<Auth />
		{/if}
	</main>
</div>

<style>
	:global(body) {
		font-family: Helvetica, sans-serif;
		--black: #0b0a08;
		--white: #fbf0df;
		--bg: var(--black);
		--color: var(--white);
		--power_color: #ee352e;
		--freeze_color: #02add0;
		--footwork_color: #fccc0a;
		--toprock_color: #6cbe44;

		padding: 0;
		margin: 0;
		color: var(--color);
		background-color: #111;
	}

	:global(a) {
		color: var(--white);
		text-decoration: none;
	}

	:global(input, select) {
		color: var(--white);
		background: transparent;
		border: solid 1px var(--white);
		border-radius: 3px;
		font-size: 24px;
		width: 100%;
		padding: 8px;
	}

	:global(label) {
		font-size: 14px;
		margin-bottom: 5px;
		color: var(--white);
		opacity: 0.5;
		display: block;
	}

	:global(input[type='submit']),
	:global(button) {
		color: var(--bg);
		background: var(--footwork_color);
		box-shadow: var(--shadow-3);
		border: none;
		font-weight: bold;
		border-radius: 8px;
		font-size: 18px;
		padding: 10px;
	}

	h1 {
		margin: 0;
	}

	nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 60px;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
		z-index: 10;
		background: var(--bg);
		font-size: 12px;
	}

	nav a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}

	.active {
		color: #f89b4b;
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding-bottom: 200px;
	}
	header {
		padding: 15px 10px;
	}

	main {
		padding: 10px;
	}
</style>
