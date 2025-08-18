<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const workspaces = data.workspaces || undefined;
</script>

<main class="mx-auto max-w-5xl space-y-8 px-4 py-16">
	<h1 class="text-5xl">My Workspaces</h1>
	{#if workspaces}
		<section>
			{#each workspaces as space}
				<details class="bg-base-100 border-base-300 collapse border">
					<summary class="collapse-title text-2xl font-semibold">{space.name}</summary>
					<div class="collapse-content text-sm space-y-2">
						<p>
							{space.description}
						</p>
                        <button type="button" class="btn btn-primary">View Space</button>
					</div>
				</details>
			{/each}
		</section>
	{/if}
</main>
