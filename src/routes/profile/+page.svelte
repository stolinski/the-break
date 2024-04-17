<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$lib/state/page'
	import { pb } from '../../pocketbase'

	page.set({ title: 'Profile' })

	function onclick() {
		pb.authStore.clear()
		goto('/login')
	}
</script>

<h2>{pb.authStore.model.name}</h2>

<p>
	Email: {pb.authStore.model.email}
</p>

<p>More coming soon</p>

<button class="warning-btn" {onclick}>Logout</button>

<!-- TODO -->
<!-- On create account auto login and redirect -->
<!-- On login redirect -->
