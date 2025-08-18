<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
    const profile = data.profile || undefined;

    // This is a basic way to handle tabs without DaisyUI classes.
    // You'd need to add CSS to make this functional.
    let activeTab: 'current' | 'completed' | 'tab3' = 'completed';
</script>

<main>
    <section>
        <div>
            <img src={profile?.user?.image} alt={profile?.user?.name} aria-label="User Avatar" />
        </div>

        <div>
            <div>
                <h1>{profile?.user?.name}</h1>
                <p>{profile?.user?.email}</p>
            </div>
            <div>
                <p>Bio:</p>
                <p>{profile?.bio}</p>
            </div>
        </div>
    </section>
    
    <section>
        <button on:click={() => activeTab = 'current'} aria-label="Current">Current</button>
        <button on:click={() => activeTab = 'completed'} aria-label="Completed">Completed</button>
        <button on:click={() => activeTab = 'tab3'} aria-label="Tab 3">Tab 3</button>
    </section>

    {#if activeTab === 'current'}
        <div>Tab content 1</div>
    {:else if activeTab === 'completed'}
        <div>Tab content 2</div>
    {:else if activeTab === 'tab3'}
        <div>Tab content 3</div>
    {/if}
</main>