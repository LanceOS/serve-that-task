import { DrizzleDB } from '$lib/Drizzle';
import { eq, or } from 'drizzle-orm';
import { projectMetadata } from '../schemas/project_metadata.schema';
import { project } from '../schemas/project.schema';

export const ProjectManager = {
	getProjects: async (workspaceId: string) => {
		return await DrizzleDB.query.project.findMany({
			where: eq(project.parentWorkspaceId, workspaceId)
		});
	},

	getProjectMetadata: async (
		workspaceId?: string,
		projectId?: string
	) => {
		return await DrizzleDB.query.projectMetadata.findMany({
			where: or(
				eq(projectMetadata.projectId, projectId!),
				eq(projectMetadata.parentWorkspaceId, workspaceId!)
			)
		});
	}
};
