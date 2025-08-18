import type { PageServerLoad } from './$types';
import { auth } from '$lib/auth';
import { error } from '@sveltejs/kit';
import { WorkspaceManager } from '$lib/server/utils/WorkspaceManager.server';
import { ProjectManager } from '$lib/server/utils/ProjectManager';

export const load: PageServerLoad = async ({ request, params }) => {
	try {
		const session = await auth.api.getSession({
			headers: request.headers
		});
		const user = session?.user;

		if (!user) {
			throw error(401, 'User must be logged in!');
		}

		const workspaceId = params.space;

		const spaceMembers = await WorkspaceManager.getWorkspaceMembers(workspaceId);
		const workspaceMetadata = await WorkspaceManager.getWorkspaceMetadata(workspaceId);

		const projects = await ProjectManager.getProjects(workspaceId);
		const projectMetadata = await ProjectManager.getProjectMetadata(workspaceId);
    
		return {
			members: spaceMembers,
			workspaceMetadata: workspaceMetadata,
			projects: projects,
			projectMetadata: projectMetadata
		};
	} catch (err: any) {
		throw error(500, err);
	}
};
