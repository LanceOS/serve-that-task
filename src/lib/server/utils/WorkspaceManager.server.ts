import { DrizzleDB } from '$lib/Drizzle';
import { eq, inArray } from 'drizzle-orm';
import { workspaceMembers } from '../schemas/workspace_members.schema';
import { workspace } from '../schemas/workspace.schema';

export const WorkspaceManager = {
	getWorkspaces: async (userId: string) => {
		return await DrizzleDB.transaction(async (tx) => {
			const relatedWorkspaces = await tx.query.workspaceMembers.findMany({
				where: eq(workspaceMembers.userId, userId)
			});

			if (relatedWorkspaces.length === 0) {
				return [];
			}

			const relatedIds = relatedWorkspaces.map((space) => space.workspaceId);
			
			const userWorkspaces = await tx.query.workspace.findMany({
				where: inArray(workspace.id, relatedIds)
			});

			return userWorkspaces;
		});
	}
};
