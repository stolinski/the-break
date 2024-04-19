<script lang="ts">
	import { pb } from '../../pocketbase'

	let form = $state({
		email: '',
		password: ''
	})
	let error = $state('')
	let loading = $state(false)

	async function onsubmit(e: SubmitEvent) {
		loading = true
		e.preventDefault()
		const authData = await pb
			.collection('users')
			.authWithPassword(form.email, form.password)
			.catch((e) => {
				console.error(e)
				error = e.message
			})
		console.log('collection', authData.record.id)
	}
</script>

<h1>Login</h1>
<form class="form" method="post" {onsubmit}>
	<div class="row">
		<label for="email">Email</label>
		<input bind:value={form.email} name="email" id="email" /><br />
	</div>
	<div class="row">
		<label for="password">Password</label>
		<input bind:value={form.password} type="password" name="password" id="password" /><br />
	</div>
	<button class="button" type="submit" disabled={loading}
		>{#if loading}Logging in...{:else}
			Log Me In Please
		{/if}</button
	>
</form>

{#if error}
	<p class="error">{error}</p>
{/if}

<p>Need an account?</p>
<a href="/signup">Sign Up</a>
<!-- <p>
	Forgot your password?
	<a href="/forgot-password">Recover</a>
</p> -->
