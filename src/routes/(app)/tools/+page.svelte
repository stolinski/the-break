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
				more than 2 people the resting breakers will have longer to rest.
			</p>
			<p>
				<em
					>Variations: footwork only, 15sec Tops 15sec footwork, how many freezes in 30 seconds of
					footwork.
				</em>
			</p>`
		},
		{
			link: 'Set Builder',
			desc: `<p>
				Make sets for battle or practice.
			</p>`
		},
		{
			link: 'Auto Set Builder',
			desc: `<p>
				Use to mathematically build sets based on assigned props values.
			</p>`
		}
	]
</script>

<div class="tools">
	{#each links as link}
		<a href={'/tools/' + kebabCase(link.link)}>
			<h2>{link.link}</h2>
			<div>
				{@html link.desc}
			</div>
		</a>
	{/each}
</div>

<style>
	.tools {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
	}

	.tools a {
		border-radius: 30px;
		display: block;
		padding: 20px;
		background-color: rgba(255, 255, 255, 0.02);
		box-shadow: 2px 4px 10px 1px rgb(0 0 0 / 0.1);
	}

	a {
		font-size: 16px;
	}
</style>
