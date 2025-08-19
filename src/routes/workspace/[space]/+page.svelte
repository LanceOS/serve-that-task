<script lang="ts">
    import type { PageProps } from './$types';
    import { i18n } from '$lib/stores/Translation.store';

    const { data }: PageProps = $props();

    const members = data.members;
    const projectMetadata = data.projectMetadata || [];
    const projects = data.projects || [];
    const workspaceMetadata = data.workspaceMetadata;

    let searchMember: string = $state('');

    const filteredMembers = $derived(
        searchMember.trim()
            ? members.filter(
                    (member) =>
                        member.name.toLowerCase().includes(searchMember.toLowerCase()) ||
                        member.email.toLowerCase().includes(searchMember.toLowerCase())
                )
            : members
    );
</script>

<main class="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-16">
    <section>
        <h1>{$i18n.t('workspaceDashboard.title')}</h1>
    </section>
    <div>
        <div>
            <section>
                <details>
                    <summary>{$i18n.t('workspaceDashboard.membersSummary')}</summary>
                    <div>
                        <label for="members">{$i18n.t('workspaceDashboard.searchMembersLabel')}</label>
                        <input
                            type="text"
                            name="members"
                            id="members"
                            class="border"
                            bind:value={searchMember}
                        />
                        {#each filteredMembers as member}
                            <div>
                                <p>{member.name}</p>
                                <p>{member.email}</p>
                            </div>
                        {/each}
                    </div>
                </details>
            </section>
            <section>
                <details>
                    <summary>{$i18n.t('workspaceDashboard.statsSummary')}</summary>
                </details>
            </section>
        </div>
        <section>
            <div>
                <h2>{$i18n.t('workspaceDashboard.projectList')}</h2>
            </div>
        </section>
    </div>
</main>