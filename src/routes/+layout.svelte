<script lang="ts">
	import Footer from '$lib/client/components/Footer.svelte';
	import Nav from '$lib/client/components/Nav.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Nav />
{@render children()}
<Footer />
