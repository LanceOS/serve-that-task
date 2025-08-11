import { InferSelectModel, sql } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { taskGroup } from "./task_group.schema";
import { defaults } from "./structures/base.schema";



export const taskItem = pgTable("task_item", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    parentGroupId: uuid("parent_group_id").references(() => taskGroup.id),
    ...defaults("task_item")
})


export type TaskItemSchema = InferSelectModel<typeof taskItem>