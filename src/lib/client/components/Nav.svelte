<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';
    import { i18n, setLanguage } from '$lib/stores/Translation.store';

    let isDropdownOpen = false;

    const availableLanguages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
    ];

    // Function to handle language selection and close the dropdown.
    const handleSetLanguage = (lang: string) => {
        setLanguage(lang);
        isDropdownOpen = false;
    };

    const signOut = async () => {
        await authClient
            .signOut()
            .then(() => {
                goto('/');
            })
            .catch((error) => {
                console.error('Failed to sign out:', error);
            });
    };

    const session = authClient.useSession();

</script>

<nav class="flex gap-4">
    <div class="navbar-menu w-fit space-x-2">
        <a href="/" aria-label="Home">{$i18n.t("navigation.home")}</a>
        <a href="/" aria-label="Pricing">{$i18n.t("navigation.pricing")}</a>
        {#if $session.data?.user.onboarded}
            <a href="/workspace" aria-label="My Workspace">{$i18n.t("navigation.myWorkspace")}</a>
            <a href="/" aria-label="Task Manager">{$i18n.t("navigation.taskManager")}</a>
            <a href="/">{$i18n.t("navigation.myTasks")}</a>
            <a href="/">{$i18n.t("navigation.inbox")}</a>
        {/if}
    </div>
    <div class="navbar-user space-x-2">
        {#if !$session?.data}
            <a href="/login" aria-label="Login">{$i18n.t("navigation.login")}</a>
        {:else}
            <a href={`/user/profile/${$session.data.user.id}`} aria-label="Profile">{$i18n.t("navigation.profile")}</a>
            <button type="button" onclick={signOut} aria-label="Logout">{$i18n.t("navigation.logout")}</button>

            <div>
                <button onclick={() => isDropdownOpen = !isDropdownOpen}>
                    {$i18n.t("navigation.language")} ▼
                </button>
                {#if isDropdownOpen}
                    <div>
                        {#each availableLanguages as lang}
                            <button onclick={() => handleSetLanguage(lang.code)}>
                                {lang.name}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</nav>