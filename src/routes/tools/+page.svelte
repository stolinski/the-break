<script>
	import kebabCase from 'just-kebab-case'
	import { page } from '$lib/state/page'

	page.set({ title: 'Tools' })

	let links = [
		{
			link: 'Battle Mode',
			desc: `<p>
				Use in battle to keep track of which moves so you don't repeat across rounds.
			</p>`
		},
		{
			link: '30s',
			desc: `<p>
				30/30's are an exercise in creativity and endurance. 30 seconds on, 30 seconds off. If you
				are training with two people, one person should always be dancing, the other resting. With
				more than 2 people the resting bboys will have longer to rest.
			</p>
			<p>Challenge your friends to see who can last the longest.</p>
			<p>
				<em
					>Variations: footwork only, 15sec Tops 15sec footwork, how many freezes in 30 seconds of
					footwork.
				</em>
			</p>`
		}
	]
</script>

<div class="tools">
	{#each links as link}
		<div>
			<a href={'/tools/' + kebabCase(link.link)}>{link.link}</a>
			{@html link.desc}
		</div>
	{/each}
</div>

<style>
	.tools {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
	}

	.tools div {
		border-radius: 30px;
		padding: 40px;
		background-color: rgba(255, 255, 255, 0.02);
		box-shadow: 0 1px 10px 1px rgb(0 0 0 / 0.1);
	}

	a {
		font-size: 24px;
		border-bottom: 3px solid var(--yellow);
	}
</style>
