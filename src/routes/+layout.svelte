<script lang="ts">
	import { page as skpage } from '$app/stores'
	import '$lib/style.css'
	import { page } from '$lib/state/page'

	import { goto } from '$app/navigation'
	import { pb } from '../pocketbase'
	import type { UsersResponse } from '../pocket-types'

	let user
	if (pb.authStore.isValid) {
		user = pb.authStore.model as UsersResponse
	} else {
		user = undefined
	}
	if (!user && $skpage.url.pathname !== '/login' && $skpage.url.pathname !== '/signup') {
		goto('/login')
	} else if (user?.id) {
		goto('/')
	}
</script>

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
		<a class:active={$skpage.url.pathname === '/tools'} href="/tools">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				id="Layer_1"
				data-name="Layer 1"
				viewBox="0 0 24 24"
				width="24"
				height="auto"
				style="rotate: 180deg;"
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
	<slot />
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 2.5vw 95vw 2.5vw;
	}

	main > :global(*) {
		grid-column: 2/3;
	}

	:global(body) {
		font-family: Helvetica, sans-serif;

		padding: 0;
		margin: 0;
		color: var(--color);
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

	h1 {
		margin: 1rem auto;
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
		box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.1);
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
		color: var(--footwork_color);
	}

	header {
		padding: 15px 10px;
	}

	main {
		padding-bottom: 2rem;
	}
</style>
