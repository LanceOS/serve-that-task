<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const profile = data.profile || undefined;
</script>

<main class="mx-auto max-w-5xl px-4 py-16">
    <section class="flex w-full gap-4 h-fit">
        <div class="avatar">
            <div class="w-20 sm:w-36 sm:h-36 rounded-full">
                <img src={profile?.user?.image} alt={profile?.user?.image} aria-label="User Avatar" />
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
                <h1 class="text-3xl sm:text-4xl wrap-long-text">{profile?.user?.name}</h1>
                <p class="wrap-long-text">{profile?.user?.email}</p>
            </div>
            <div class="flex flex-col gap-2">
                <p>Bio:</p>
                <p>{profile?.bio}</p>
            </div>
        </div>
    </section>
</main>
