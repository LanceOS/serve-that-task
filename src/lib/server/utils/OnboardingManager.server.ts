import { DrizzleDB } from '$lib/Drizzle';
import { eq } from 'drizzle-orm';
import { userMetadata } from '../schemas/user_metadata.schema';
import { workspace } from '../schemas/workspace.schema';
import { inviteCodes } from '../schemas/invite_codes.schema';
import { user } from '../schemas/authentication.schema';
import { workspaceMembers } from '../schemas/workspace_members.schema';

export const OnboardingManager = {
	assignUserToWorkspace: async (userId: string, code: string) => {
		await DrizzleDB.transaction(async (tx) => {
			const inviteCodeResponse = await tx.query.inviteCodes.findFirst({
				where: eq(inviteCodes.inviteCode, code)
			});

			if (!inviteCodeResponse) {
				throw new Error('Incorrect invite code.');
			}

			await tx.delete(inviteCodes).where(eq(inviteCodes.id, inviteCodeResponse.id));

			await tx.insert(userMetadata).values({
				userId: userId,
				has_workspace: true
			})

			await tx.insert(workspaceMembers).values({
				userId: userId,
				workspaceId: inviteCodeResponse.workspaceId
			})

			await tx
				.update(user)
				.set({
					onboarded: true
				})
				.where(eq(user.id, userId));
		});
	},
	createUserWorkspace: async (
		userId: string,
		workspaceData: { name: string; description: string }
	) => {
		await DrizzleDB.transaction(async (tx) => {
			const newSpace = await tx
				.insert(workspace)
				.values({
					name: workspaceData.name,
					description: workspaceData.description,
					ownerId: userId
				})
				.returning({ id: workspace.id });

			await tx.insert(userMetadata).values({
				userId: userId,
				has_workspace: true
			});

			await tx.insert(workspaceMembers).values({
				userId: userId,
				workspaceId: newSpace[0].id
			})

			await tx
				.update(user)
				.set({
					onboarded: true
				})
				.where(eq(user.id, userId));
		});
	}
};
