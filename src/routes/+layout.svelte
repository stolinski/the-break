<script lang="ts">
	import { page as skpage } from '$app/stores'
	import '$lib/style.css'
	import { page } from '$lib/state/page'
	import { goto } from '$app/navigation'
	import { pb } from '../pocketbase'
	import type { UsersResponse } from '../pocket-types'
	import { moves } from '$state/moves.svelte'

	moves.load()

	let user: UsersResponse | undefined
	if (pb.authStore.isValid) {
		user = pb.authStore.model as UsersResponse
	} else {
		user = undefined
	}
	if (!user && $skpage.url.pathname !== '/login' && $skpage.url.pathname !== '/signup') {
		goto('/login')
	} else if (
		user?.id &&
		($skpage.url.pathname === '/login' || $skpage.url.pathname === '/signup')
	) {
		goto('/')
	}
</script>

{#if user}
	<header>
		<h1>{$page.title}</h1>
		<nav>
			<a class:active={$skpage.url.pathname === '/'} href="/">
				<svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M20 19V16H7C5.34315 16 4 17.3431 4 19M8.8 22H16.8C17.9201 22 18.4802 22 18.908 21.782C19.2843 21.5903 19.5903 21.2843 19.782 20.908C20 20.4802 20 19.9201 20 18.8V5.2C20 4.07989 20 3.51984 19.782 3.09202C19.5903 2.71569 19.2843 2.40973 18.908 2.21799C18.4802 2 17.9201 2 16.8 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Move Book
			</a>
			<a class:active={$skpage.url.pathname === '/tools'} href="/tools">
				<svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M9 6V10.5012C9 11.0521 9 11.3276 8.93132 11.5829C8.87047 11.809 8.77037 12.0228 8.63557 12.2143C8.48344 12.4305 8.27182 12.6068 7.84859 12.9595L4.15141 16.0405C3.72818 16.3932 3.51656 16.5695 3.36443 16.7857C3.22963 16.9772 3.12953 17.191 3.06868 17.4171C3 17.6724 3 17.9479 3 18.4988V18.8C3 19.9201 3 20.4802 3.21799 20.908C3.40973 21.2843 3.71569 21.5903 4.09202 21.782C4.51984 22 5.0799 22 6.2 22H17.8C18.9201 22 19.4802 22 19.908 21.782C20.2843 21.5903 20.5903 21.2843 20.782 20.908C21 20.4802 21 19.9201 21 18.8V18.4988C21 17.9479 21 17.6724 20.9313 17.4171C20.8705 17.191 20.7704 16.9772 20.6356 16.7857C20.4834 16.5695 20.2718 16.3932 19.8486 16.0405L16.1514 12.9595C15.7282 12.6068 15.5166 12.4305 15.3644 12.2143C15.2296 12.0228 15.1295 11.809 15.0687 11.5829C15 11.3276 15 11.0521 15 10.5012V6M8.3 6H15.7C15.98 6 16.12 6 16.227 5.9455C16.3211 5.89757 16.3976 5.82108 16.4455 5.727C16.5 5.62004 16.5 5.48003 16.5 5.2V2.8C16.5 2.51997 16.5 2.37996 16.4455 2.273C16.3976 2.17892 16.3211 2.10243 16.227 2.0545C16.12 2 15.98 2 15.7 2H8.3C8.01997 2 7.87996 2 7.773 2.0545C7.67892 2.10243 7.60243 2.17892 7.5545 2.273C7.5 2.37996 7.5 2.51997 7.5 2.8V5.2C7.5 5.48003 7.5 5.62004 7.5545 5.727C7.60243 5.82108 7.67892 5.89757 7.773 5.9455C7.87996 6 8.01997 6 8.3 6ZM5.5 17H18.5C18.9647 17 19.197 17 19.3902 17.0384C20.1836 17.1962 20.8038 17.8164 20.9616 18.6098C21 18.803 21 19.0353 21 19.5C21 19.9647 21 20.197 20.9616 20.3902C20.8038 21.1836 20.1836 21.8038 19.3902 21.9616C19.197 22 18.9647 22 18.5 22H5.5C5.03534 22 4.80302 22 4.60982 21.9616C3.81644 21.8038 3.19624 21.1836 3.03843 20.3902C3 20.197 3 19.9647 3 19.5C3 19.0353 3 18.803 3.03843 18.6098C3.19624 17.8164 3.81644 17.1962 4.60982 17.0384C4.80302 17 5.03534 17 5.5 17Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Tools
			</a>
			<a class:active={$skpage.url.pathname === '/profile'} href="/profile">
				<svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Profile
			</a>
		</nav>
	</header>
{/if}

<main>
	<slot />
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 2.5vw 95vw 2.5vw;
		padding-bottom: var(--nav_height);
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
		height: var(--nav_height);
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
</style>
