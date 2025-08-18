import { DrizzleDB } from '$lib/Drizzle';
import { desc, eq, inArray } from 'drizzle-orm';
import { workspaceMembers } from '../schemas/workspace_members.schema';
import { workspace } from '../schemas/workspace.schema';
import { user } from '../schemas/authentication.schema';
import { workspaceMetadata, type IWorkspaceMetadata } from '../schemas/workspace_metadata.schema';

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
				where: inArray(workspace.id, relatedIds),
				orderBy: [desc(workspace.id)]
			});
			
			return userWorkspaces;
		});
	},

	getWorkspaceMembers: async (workspaceId: string) => {
		return await DrizzleDB.transaction(async (tx) => {
			const relatedWorkspaces = await tx.query.workspaceMembers.findMany({
				where: eq(workspaceMembers.workspaceId, workspaceId)
			});

			if (relatedWorkspaces.length === 0) {
				return [];
			}

			const relatedUserIds = relatedWorkspaces.map((space) => space.userId);

			const spaceMembers = await tx.query.user.findMany({
				where: inArray(user.id, relatedUserIds)
			});
			return spaceMembers;
		});
	},

	getWorkspaceMetadata: async (workspaceId: string) => {
		return await DrizzleDB.query.workspaceMetadata.findFirst({
			where: eq(workspaceMetadata.workspaceId, workspaceId)
		})
	}
};
