import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { workspace } from "./workspace.schema";
import { user } from "./authentication.schema";
import { defaults } from "./structures/base.schema";

/**
 * @description {project} Tasks in orgs will be grouped into different projects. This
 * allows for task groups to be separated under different projects.
 */
export const project = pgTable("project", {
    id: uuid("id").primaryKey().defaultRandom(),
    parentWorkspaceId: uuid("parent_workspace_id").references(() => workspace.id).notNull(),
    userId: text("user_id").references(() => user.id).notNull(),
    projectName: text("project_name").notNull(),
    description: text("description").notNull(),
    ...defaults("project")
})