<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Toaster } from '$lib/client/components/toaster/Toaster';

	const session = authClient.useSession();
	let user = $derived($session?.data?.user);


	let onboarder = $state({
		name: user?.name ?? '',
		accountType: 'individual', // 'individual', 'create_team', or 'join_team'
		teamName: '',
		teamDescription: '',
		inviteCode: ''
	});

	const confirm = async () => {
		try {
			const data = {
				onboarder,
				user
			};

			const response = await fetch('/onboarding', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

            if(!response.ok) {
                throw new Error()
            }
		} catch (error) {
            Toaster.ejectToast({
                message: "Failed to onboard",
                type: "error"
            })
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
						value="individual"
						bind:group={onboarder.accountType}
					/>
					<span>For myself (individual)</span>
				</label>
				<label
					class="has-[:checked]:border-primary flex cursor-pointer items-center gap-3 rounded-lg border p-3"
				>
					<input
						type="radio"
						name="accountType"
						class="radio radio-primary"
						value="create_team"
						bind:group={onboarder.accountType}
					/>
					<span>Create a new team</span>
				</label>
				<label
					class="has-[:checked]:border-primary flex cursor-pointer items-center gap-3 rounded-lg border p-3"
				>
					<input
						type="radio"
						name="accountType"
						class="radio radio-primary"
						value="join_team"
						bind:group={onboarder.accountType}
					/>
					<span>Join an existing team</span>
				</label>
			</div>
		</div>

		{#if onboarder.accountType === 'create_team'}
			<div class="border-base-content/20 bg-base-200/50 space-y-4 rounded-md border p-4">
				<h3 class="font-semibold">Tell us about your new team:</h3>
				<div class="form-control w-full">
					<label class="label" for="team-name-input">
						<span class="label-text">Team Name</span>
					</label>
					<input
						id="team-name-input"
						type="text"
						class="input input-bordered w-full"
						placeholder="The A-Team"
						bind:value={onboarder.teamName}
						required
					/>
				</div>
				<div class="form-control w-full">
					<label class="label" for="team-desc-input">
						<span class="label-text">Team Description</span>
						<span class="label-text-alt" class:text-error={onboarder.teamDescription.length >= 250}>
							{onboarder.teamDescription.length} / 250
						</span>
					</label>
					<textarea
						id="team-desc-input"
						class="textarea textarea-bordered w-full"
						placeholder="A short and sweet description of what your team does."
						bind:value={onboarder.teamDescription}
						maxlength="250"
					></textarea>
				</div>
			</div>
		{/if}

		{#if onboarder.accountType === 'join_team'}
			<div class="border-base-content/20 bg-base-200/50 space-y-4 rounded-md border p-4">
				<h3 class="font-semibold">Enter your team's invite code:</h3>
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

		<button type="submit" class="btn btn-primary w-full">Finish Setup</button>
	</form>
</main>
