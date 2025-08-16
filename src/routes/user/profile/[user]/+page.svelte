<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const profile = data.profile || undefined;
</script>

<main class="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-16">
	<section class="flex h-fit w-full gap-4">
		<div class="avatar">
			<div class="w-20 rounded-full sm:h-36 sm:w-36">
				<img src={profile?.user?.image} alt={profile?.user?.image} aria-label="User Avatar" />
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex flex-col gap-2">
				<h1 class="wrap-long-text text-3xl sm:text-4xl">{profile?.user?.name}</h1>
				<p class="wrap-long-text">{profile?.user?.email}</p>
			</div>
			<div class="flex flex-col gap-2">
				<p>Bio:</p>
				<p>{profile?.bio}</p>
			</div>
		</div>
	</section>
	<section class="tabs tabs-lift">
		<input type="radio" name="my_tabs_3" class="tab" aria-label="Current" />
		<div class="tab-content bg-base-100 border-base-300 p-6">Tab content 1</div>

		<input type="radio" name="my_tabs_3" class="tab" aria-label="Completed" checked="checked" />
		<div class="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

		<input type="radio" name="my_tabs_3" class="tab" aria-label="Tab 3" />
		<div class="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
	</section>
</main>
