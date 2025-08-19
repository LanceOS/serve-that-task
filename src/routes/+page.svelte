<script lang="ts">
    import { useSession } from "$lib/auth-client";
    import { i18n } from "$lib/stores/Translation.store";

    const session = useSession();
    console.log($session);
</script>

<main>
    <section>
        <h1>{$i18n.t("home.title")}</h1>
        <p>{$i18n.t("home.subtitle")}</p>
    </section>
</main>