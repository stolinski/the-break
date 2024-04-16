<script lang="ts">
	import { page } from '$lib/state/page'
	import { pb } from '../../pocketbase'

	page.set({ title: 'Profile' })
</script>

<h2>{pb.authStore.model.name}</h2>

<p>
	Email: {pb.authStore.model.email}
</p>

<p>More coming soon</p>

<button class="warning-btn">Logout</button>
