import { sql } from "drizzle-orm";
import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { Org } from "./organization.schema";
import { defaults } from "./structures/base.schema";


export const taskGroup = pgTable("task_group", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    groupName: text("group_name").notNull(),
    parentOrgId: uuid("parent_org_id").references(() => Org.id).notNull(),
    ...defaults("task_group")
})