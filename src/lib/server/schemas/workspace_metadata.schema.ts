import { integer, uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { workspace } from './workspace.schema';
import type { InferSelectModel } from 'drizzle-orm';

export const workspaceMetadata = pgTable('workspace_metadata', {
	id: uuid('id').primaryKey().defaultRandom(),
	workspaceId: uuid("workspace_id").references(() => workspace.id),
	numOfProjects: integer("num_of_projects").default(0),
	numOfMembers: integer("num_of_members").default(1)
});

export type IWorkspaceMetadata = InferSelectModel<typeof workspaceMetadata>
