<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<main class="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4">
	<fieldset class="fieldset bg-base-100 border-base-300 rounded-box w-md border p-4 space-y-4">
		<legend class="fieldset-legend text-2xl">Login</legend>

		<div class="flex flex-col w-full">
			<label class="label text-base-content">Email</label>
			<input type="email" class="input w-full" placeholder="Email" />
		</div>

		<div class="card-actions flex flex-col items-center">
			<button class="btn btn-content w-full"> <Icon icon="ic:sharp-email" />Log In</button>
			<button class="btn btn-content w-full"
				><Icon icon="devicon:google" /> Log In With Google</button
			>
			<button class="btn btn-content w-full"
				><Icon icon="akar-icons:github-fill" /> Log In With Github</button
			>
			<button class="btn btn-content w-full"><Icon icon="bi:apple" /> Log In With Apple</button>
		</div>
	</fieldset>
</main>
