<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
	import { SignIns } from '$lib/client/utils/SignIns.client';
	import Icon from '@iconify/svelte';

	let email: string = $state('');
	let otp: string = $state('');
	let timer: number = $state(0);
	let timerInterval: any | undefined;

	// const signInWithSocial = async (socialProvider: string) => {
	// 	try {
	// 		const response = await authClient.signIn.social({ provider: socialProvider });

	// 		if(response.error) {
	// 			throw new Error()
	// 		}

	// 		if(response.data) {
	// 			console.log(response.data)
	// 		}
	// 	}
	// 	catch(error: unknown) {
	// 		Toaster.ejectToast({
	// 			message: "Failed to log in!",
	// 			type: "error"
	// 		})
	// 	}
	// };

	const sendOTP = async () => {
		const result = await SignIns.sendOTP(email);
		if(result === false) {
			return;
		}

		document.getElementById('my_modal_1')!.showModal();
		if (timerInterval) {
			clearInterval(timerInterval);
		}

		timer = 120;
		timerInterval = setInterval(() => {
			if (timer > 0) {
				timer = timer - 1;
			} else {
				clearInterval(timerInterval);
				timerInterval = undefined;
			}
		}, 1000);
	};

	const confirmOTP = async () => {
		await SignIns.confirmOTP(email, otp)
	}
</script>

<main class="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4">
	<fieldset class="fieldset bg-base-100 border-base-300 rounded-box w-md space-y-4 border p-4">
		<legend class="fieldset-legend text-2xl">Login</legend>

		<div class="flex w-full flex-col">
			<label for="email" class="label text-base-content">Email</label>
			<input
				name="email"
				id="email"
				type="email"
				class="input w-full"
				aria-label="Enter Your Email"
				placeholder="Email"
				bind:value={email}
			/>
		</div>

		<div class="card-actions flex flex-col items-center">
			<button class="btn btn-content w-full" aria-label="Sign in with email" onclick={sendOTP}>
				<Icon icon="ic:sharp-email" />Log In</button
			>
			<!-- <button class="btn btn-content w-full" aria-label="Sign in with google"
				><Icon icon="devicon:google" onclick={() => signInWithSocial('google')} /> Log In With Google</button
			>
			<button class="btn btn-content w-full" aria-label="Sign in with github"
				><Icon icon="akar-icons:github-fill" onclick={() => signInWithSocial('github')} /> Log In With
				Github</button
			>
			<button class="btn btn-content w-full" aria-label="Sign in with apple"
				><Icon icon="bi:apple" /> Log In With Apple</button
			>
			<button class="btn btn-content w-full" aria-label="Sign in with microsoft"
				><Icon icon="ion:logo-microsoft" /> Log In With Microsoft</button
			> -->
		</div>
	</fieldset>
</main>

<dialog id="my_modal_1" class="modal">
	<div class="modal-box">
		<div class="space-y-2">
			<h3 class="text-lg font-bold">Please enter your code.</h3>
			<input type="text" placeholder="1234" class="input w-full" bind:value={otp} />
			<p class="text-sm">Code expires in: {timer}</p>
		</div>
		<div class="modal-action">
			<form method="dialog">
				<button type="button" class="btn" onclick={confirmOTP}>Confirm</button>
			</form>
		</div>
	</div>
</dialog>
