<script lang="ts">
    import { goto } from '$app/navigation';
    import type { WorkspaceSchema } from '$lib/server/schemas/workspace.schema';
    import type { PageProps } from './$types';
    import { i18n } from '$lib/stores/Translation.store';
    
    const { data }: PageProps = $props();
    const workspaces: WorkspaceSchema[] = data.workspaces ?? [];

    let searchWorkspace = $state('');

    const filtered = $derived(
        searchWorkspace.trim()
            ? workspaces.filter((space) =>
                    space.name.toLowerCase().includes(searchWorkspace.toLowerCase())
                )
            : workspaces
    );
</script>

<main>
    <h1>{$i18n.t('workspaces.title')}</h1>
    <label for="spacename">{$i18n.t('workspaces.searchLabel')}</label>
    <input type="text" name="spacename" id="spacename" class="border" bind:value={searchWorkspace} />
    {#if filtered}
        <section>
            {#each filtered as space}
                <details>
                    <summary>{space.name}</summary>
                    <div>
                        <p>
                            {space.description}
                        </p>
                        <a
                            href={`/workspace/${space.id}`}
                            class="inline-block cursor-pointer rounded border px-2 py-1"
                            aria-label={`Workspace ${space.name}`}
                        >
                            {$i18n.t('workspaces.viewSpace')}
                        </a>
                    </div>
                </details>
            {/each}
        </section>
    {/if}
</main>