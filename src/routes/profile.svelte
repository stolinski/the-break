<script lang="ts">
	import Profile from '$lib/Profile.svelte';
	import { page } from '$lib/state/page';

	page.set({ title: 'Settings' });
</script>

<Profile />
