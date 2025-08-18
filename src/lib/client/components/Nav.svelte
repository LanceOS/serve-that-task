<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';

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
    <div class="w-fit navbar-menu space-x-2">
        <a href="/" aria-label="Home">Home</a>
        <a href="/" aria-label="Pricing">Pricing</a>
        {#if $session.data?.user.onboarded}
            <a href="/workspace" aria-label="My Workspace">My Workspace</a>
            <a href="/" aria-label="Task Manager">Task Manager</a>
            <a href="/">My Tasks</a>
            <a href="/">Inbox</a>
        {/if}
    </div>
    <div class="navbar-user space-x-2">
        {#if !$session?.data}
            <a href="/login" aria-label="Login">Login</a>
        {:else}
            <a href={`/user/profile/${$session.data.user.id}`} aria-label="Profile">
                Profile
            </a>
            <button type="button" on:click={signOut} aria-label="Logout">Logout</button>
        {/if}
    </div>
</nav>