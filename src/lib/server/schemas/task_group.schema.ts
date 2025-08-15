import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { Org } from "./organization.schema";
import { defaults } from "./structures/base.schema";
import type { InferSelectModel } from "drizzle-orm";


export const taskGroup = pgTable("task_group", {
    id: uuid("id").primaryKey().defaultRandom(),
    groupName: text("group_name").notNull(),
    parentOrgId: uuid("parent_org_id").references(() => Org.id).notNull(),
    ...defaults("task_group")
})

export type TaskGroupSchema = InferSelectModel<typeof taskGroup>