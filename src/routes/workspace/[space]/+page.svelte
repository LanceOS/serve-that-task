<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const members = data.members;
	const projectMetadata = data.projectMetadata || [];
	const projects = data.projects || [];
	const workspaceMetadata = data.workspaceMetadata;

	let searchMember: string = $state('');

	const filteredMembers = $derived(
		searchMember.trim()
			? members.filter(
					(member) =>
						member.name.toLowerCase().includes(searchMember.toLowerCase()) ||
						member.email.toLowerCase().includes(searchMember.toLowerCase())
				)
			: members
	);
</script>

<main class="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-16">
	<section>
		<h1>Workspace</h1>
	</section>
	<div>
		<div>
			<section>
				<details>
					<summary>Workspace Members</summary>
					<div>
						<label for="members">Search Members</label>
						<input
							type="text"
							name="members"
							id="members"
							class="border"
							bind:value={searchMember}
						/>
						{#each filteredMembers as member}
							<div>
								<p>{member.name}</p>
								<p>{member.email}</p>
							</div>
						{/each}
					</div>
				</details>
			</section>
			<section>
				<details>
					<summary>Workspace Stats</summary>
					<div>
						Click the "Sign Up" button in the top right corner and follow the registration process.
					</div>
				</details>
			</section>
		</div>
		<section>
			<div>
				<h2>Project List</h2>
				<p>
					A card component has a figure, a body part, and inside body there are title and actions
					parts
				</p>
				<div>
					<button>Buy Now</button>
				</div>
			</div>
		</section>
	</div>
</main>
