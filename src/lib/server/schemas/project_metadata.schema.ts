import { boolean, integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { project } from "./project.schema";
import { workspace } from "./workspace.schema";
import type { InferSelectModel } from "drizzle-orm";


export const projectMetadata = pgTable("project_metadata", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id").references(() => project.id),
    parentWorkspaceId: uuid("parent_workspace_id").references(() => workspace.id),
    completed: boolean("completed").default(false),
    canceled: boolean("canceled").default(false),
    numOfMembers: integer("num_of_members").default(1),
    numOfTasks: integer("num_of_tasks").default(0)
});

export type ProjectMetadataSchema = InferSelectModel<typeof projectMetadata>