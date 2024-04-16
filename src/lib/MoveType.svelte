<script lang="ts">
	const { type_name }: { type_name: string } = $props()
</script>

<h3 class={type_name.toLocaleLowerCase()}>
	<span>{type_name.charAt(0)}</span>
	{type_name}
</h3>

<style>
	h3 {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.footwork span {
		background-color: var(--footwork_color);
		color: #000;
	}
	.toprock span {
		background-color: var(--toprock_color);
	}
	.freeze span {
		background-color: var(--freeze_color);
	}
	.power span {
		background-color: var(--power_color);
	}

	h3 span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		color: white;
		font-weight: 900;
		border-radius: 30px;
		background-color: green;
	}
</style>
