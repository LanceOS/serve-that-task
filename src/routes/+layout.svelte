<script lang="ts">
	import Nav from '$lib/client/components/Nav.svelte';
	import Toast from '$lib/client/components/toaster/Toast.svelte';
	import { toastStore } from '$lib/client/components/toaster/Toaster';
	import '../app.css';

	let { children } = $props();
</script>

{#if $toastStore.visible}
	<Toast message={$toastStore.message} type={$toastStore.type} />
{/if}
<Nav />
{@render children()}
