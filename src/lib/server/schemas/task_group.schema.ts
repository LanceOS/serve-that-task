import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";
import { team } from "./team.schema";
import { defaults } from "./structures/base.schema";
import type { InferSelectModel } from "drizzle-orm";
import { project } from "./project.schema";


export const taskGroup = pgTable("task_group", {
    id: uuid("id").primaryKey().defaultRandom(),
    groupName: text("group_name").notNull(),
    order: integer("order").default(1),
    parentOrgId: uuid("parent_team_id").references(() => team.id).notNull(),
    parentProjectId: uuid("parent_project_id").references(() => project.id).notNull(),
    ...defaults("task_group")
})

export type TaskGroupSchema = InferSelectModel<typeof taskGroup>