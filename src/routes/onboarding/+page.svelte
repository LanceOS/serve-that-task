<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { Toaster } from '$lib/client/components/toaster/Toaster';

	const session = authClient.useSession();
	let user = $derived($session?.data?.user);

	let onboarder = $state({
		name: user?.name ?? '',
		accountType: 'create_workspace', // 'create_workspace', or 'join_workspace'
		workspaceName: '',
		workspaceDescription: '',
		inviteCode: ''
	});

	const confirm = async () => {
		try {
			if (!user) {
				throw new Error('User must be logged in!');
			}
			if (onboarder.accountType === 'create_workspace') {
				if (!onboarder.workspaceName || !onboarder.workspaceDescription) {
					throw new Error('Please fill out all workspace fields.');
				}
			}
			if (onboarder.accountType === 'join_workspace') {
				if (!onboarder.inviteCode) {
					throw new Error('Please enter an invite code.');
				}
			}

			const response = await fetch('/onboarding', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(onboarder)
			});

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong.');
            }
			
            Toaster.ejectToast({
                message: "Successfully onboarded!",
                type: "success"
            });
            goto(`/user/profile/${user.id}`);
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message,
				type: 'error'
			});
		}
	};
</script>

<main class="mx-auto flex min-h-screen max-w-xl items-center justify-center p-4">
	<form class="bg-base-100 w-full space-y-6 rounded-lg border p-8">
		<div class="text-center">
			<h1 class="text-3xl font-bold">Welcome!</h1>
			<p class="text-base-content/70">Let's finish setting up your account.</p>
		</div>

		<div class="form-control w-full">
			<label class="label" for="name-input">
				<span class="label-text">What's your full name?</span>
			</label>
			<input
				id="name-input"
				type="text"
				class="input input-bordered w-full"
				placeholder="Jane Doe"
				bind:value={onboarder.name}
				required
			/>
		</div>

		<div class="form-control">
			<label class="label">
				<span class="label-text">How are you planning to use this service?</span>
			</label>
			<div class="flex flex-col gap-2">
				<label
					class="has-[:checked]:border-primary flex cursor-pointer items-center gap-3 rounded-lg border p-3"
				>
					<input
						type="radio"
						name="accountType"
						class="radio radio-primary"
						value="create_workspace"
						bind:group={onboarder.accountType}
					/>
					<span>Create a new workspace</span>
				</label>
				<label
					class="has-[:checked]:border-primary flex cursor-pointer items-center gap-3 rounded-lg border p-3"
				>
					<input
						type="radio"
						name="accountType"
						class="radio radio-primary"
						value="join_workspace"
						bind:group={onboarder.accountType}
					/>
					<span>Join an existing workspace</span>
				</label>
			</div>
		</div>

		{#if onboarder.accountType === 'create_workspace'}
			<div class="border-base-content/20 bg-base-200/50 space-y-4 rounded-md border p-4">
				<h3 class="font-semibold">Tell us about your new workspace:</h3>
				<div class="form-control w-full">
					<label class="label" for="workspace-name-input">
						<span class="label-text">Workspace Name</span>
					</label>
					<input
						id="workspace-name-input"
						type="text"
						class="input input-bordered w-full"
						placeholder="New Business Idea"
						bind:value={onboarder.workspaceName}
						required
					/>
				</div>
				<div class="form-control w-full">
					<label class="label" for="workspace-desc-input">
						<span class="label-text">Workspace Description</span>
						<span
							class="label-text-alt"
							class:text-error={onboarder.workspaceDescription.length >= 150}
						>
							{onboarder.workspaceDescription.length} / 150
						</span>
					</label>
					<textarea
						id="workspace-desc-input"
						class="textarea textarea-bordered w-full"
						placeholder="A short and sweet description of what your workspace does."
						bind:value={onboarder.workspaceDescription}
						maxlength="150"
					></textarea>
				</div>
			</div>
		{/if}

		{#if onboarder.accountType === 'join_workspace'}
			<div class="border-base-content/20 bg-base-200/50 space-y-4 rounded-md border p-4">
				<h3 class="font-semibold">Enter your workspace's invite code:</h3>
				<div class="form-control w-full">
					<label class="label" for="invite-code-input">
						<span class="label-text">Invite Code</span>
					</label>
					<input
						id="invite-code-input"
						type="text"
						class="input input-bordered w-full"
						placeholder="Paste invite code here"
						bind:value={onboarder.inviteCode}
						required
					/>
				</div>
			</div>
		{/if}

		<button type="button" class="btn btn-primary w-full" onclick={confirm}>Finish Setup</button>
	</form>
</main>
