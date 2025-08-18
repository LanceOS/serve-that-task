<script lang="ts">
    import { useSession } from "$lib/auth-client";
    import Footer from "$lib/client/components/Footer.svelte";

    const session = useSession();
    console.log($session);
</script>

<main>
    <section>
        <h1>Serve That Task</h1>
        <p>The easy non-bloated employee tasking and messaging app!</p>
    </section>

    <section>
        <h2>Benefits of using Serve That Task</h2>
        <ul>
            <li>
                <p>Easy Messaging and Minimal UI</p>
            </li>
            <li>
                <p>Competitive Pricing</p>
            </li>
        </ul>
    </section>
</main>