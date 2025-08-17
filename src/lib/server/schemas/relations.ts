import { relations } from 'drizzle-orm';
import { workspace } from './workspace.schema';
import { profile } from './profile.schema';
import { user } from './authentication.schema';
import { workspaceMembers } from './workspace_members.schema';

export const workspaceRelations = relations(workspace, ({ one, many }) => ({
	user: one(user, {
		fields: [workspace.ownerId],
		references: [user.id]
	}),
	workspaceMembers: many(workspaceMembers)
}));

export const profilesRelations = relations(profile, ({ one }) => ({
	// A profile belongs to one user
	user: one(user, {
		fields: [profile.userId],
		references: [user.id]
	})
}));

export const workspaceMembersRelations = relations(workspaceMembers, ({ one }) => ({
	user: one(user, {
		fields: [workspaceMembers.userId],
		references: [user.id]
	}),
	workspace: one(workspace, {
		fields: [workspaceMembers.workspaceId],
		references: [workspace.id]
	})
}));

export const userRelations = relations(user, ({ many }) => ({
	workspaceMembers: many(workspaceMembers)
}));
