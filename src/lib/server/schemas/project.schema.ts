import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { org } from "./organization.schema";
import { user } from "./authentication.schema";

/**
 * @description {project} Tasks in orgs will be grouped into different projects. This
 * allows for task groups to be separated under different projects.
 */
export const project = pgTable("project", {
    id: uuid("id").primaryKey().defaultRandom(),
    parentOrgId: uuid("parent_org_id").references(() => org.id).notNull(),
    userId: text("user_id").references(() => user.id).notNull(),
    projectName: text("project_name").notNull(),
    
})