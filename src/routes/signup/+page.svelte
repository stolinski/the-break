<script lang="ts">
	import { pb } from '../../pocketbase'
	let form = $state({
		email: '',
		password: '',
		username: ''
	})
	let error = $state('')
	let loading = $state(false)

	async function signup(e: SubmitEvent) {
		loading = true
		e.preventDefault()

		await pb
			.collection('users')
			.create({
				name: form.username,
				email: form.email,
				password: form.password,
				passwordConfirm: form.password
			})
			.catch((e) => {
				console.error(e)
				error = e.message
			})
		loading = false
	}
</script>

<h1>Sign up</h1>
<form class="form" method="post" onsubmit={signup}>
	<div class="row">
		<label for="username">Bboy / Bgirl Name</label>
		<input bind:value={form.username} name="username" id="username" /><br />
	</div>
	<div class="row">
		<label for="email">Email</label>
		<input bind:value={form.email} name="email" id="email" /><br />
	</div>
	<div class="row">
		<label for="password">Password</label>
		<input bind:value={form.password} type="password" name="password" id="password" /><br />
	</div>
	<button class="button" type="submit" disabled={loading}
		>{#if loading}Signing up...{:else}
			Sign Me Up
		{/if}</button
	>
</form>

<!-- Local first thoughts -->
<!-- On first load, check if local db exits, if so load when "last synced"  -->
<!-- Also load network db and check when "last synced" -->
<!-- Compare "last synced", if local is more modern, push to network db, update "last synced" -->
<!-- IF network exists, ALWAYS push to network db, update last synced from network -->

{#if error}
	<p class="error">{error}</p>
{/if}

<p>Already have an account?</p>
<a href="/login">Sign in</a>
