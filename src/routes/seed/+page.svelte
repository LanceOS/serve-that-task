<script lang="ts">
	import { Toaster } from "$lib/client/components/toaster/Toaster";

	let seeded: boolean = $state(false)

	const seedDatabase = async () => {
		try {
			const response = await fetch('/seed', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

            if(response.ok) {
				seeded = true;
                Toaster.ejectToast({
                    message: "Successfully seeded database!",
                    type: "success"
                })
            }
		} catch (e: any) {
            Toaster.ejectToast({
                message: `Network error: ${e.message}`,
                type: "error"
            })
            
		}
	}
</script>

<main class="h-screen max-w-2xl mx-auto flex flex-col justify-center items-center text-center gap-8">
	<h1 class="text-5xl">Database Seeder</h1>

	<button type="button" class="btn btn-primary" onclick={seedDatabase} disabled={seeded}>Seed Database</button>
</main>