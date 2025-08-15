<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import Icon from '@iconify/svelte';
	import { Toaster } from './toaster/Toaster';
	import { goto } from '$app/navigation';

	const signOut = async () => {
		await authClient
			.signOut()
			.then(() => {
				goto('/');
			})
			.catch((error) => {
				Toaster.ejectToast({
					message: 'Failed to sign out!',
					type: 'error'
				});
			});
	};

	const session = authClient.useSession();
</script>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content absolute top-4 right-4 w-fit">
		<label for="my-drawer" class="btn btn-md md:btn-lg drawer-button text-lg md:text-2xl">
			<Icon icon="ooui:menu" />
		</label>
	</div>
	<aside class="drawer-side">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul
			class="menu bg-base-100 text-content flex min-h-full w-3/4 flex-col justify-between p-4 md:w-80"
		>
			<div>
				<label class="flex cursor-pointer items-center justify-center gap-8 mb-4">
					<span class="label-text">Light Mode</span>
					<input type="checkbox" value="dim" class="toggle theme-controller" />
					<span class="label-text">Dark Mode</span>
				</label>
				<li><a href="/">Home</a></li>
				<li><a href="/">Pricing</a></li>
				<li><a href="/">My Organization</a></li>
				<li><a href="/">Task Manager</a></li>
				<li>
					<a href="/">
						<div class="indicator -space-x-2">
							<span class="indicator-item badge badge-secondary h-4 w-2 text-xs">2</span>
							<span>My Tasks</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/">
						<div class="indicator -space-x-2">
							<span class="indicator-item badge badge-secondary h-4 w-2 text-xs">12</span>
							<span>Inbox</span>
						</div>
					</a>
				</li>
			</div>
			<div class="space-y-2">
				{#if !$session?.data}
					<li>
						<a href="/login" class="btn btn-content" aria-label="Login">Login</a>
					</li>
				{:else}
					<li>
						<a href={`/user/profile/${$session.data.user.id}`} class="flex items-center justify-between">
							Profile
							<div class="avatar">
								<div class="w-8 rounded-full">
									<img
										src={$session.data.user.image}
										aria-label={$session.data.user.name}
										alt={$session.data.user.name}
									/>
								</div>
							</div>
						</a>
					</li>
					<li>
						<button type="button" onclick={signOut} class="btn btn-content" aria-label="Login"
							>Logout</button
						>
					</li>
				{/if}
			</div>
		</ul>
	</aside>
</div>
