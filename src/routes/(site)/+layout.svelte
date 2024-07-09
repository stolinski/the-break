<script lang="ts">
	import { app_guard } from '$utils/app_guard'
	const { children } = $props()
	$effect.pre(app_guard);
</script>


{@render children()}