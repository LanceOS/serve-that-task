import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { workspace } from "./workspace.schema";
import { user } from "./authentication.schema";
import type { InferSelectModel } from "drizzle-orm";


export const workspaceMembers = pgTable("workspace_members", {
    id: uuid("id").primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id").references(() => workspace.id).notNull(),
    userId: text("user_id").references(() => user.id).notNull(),
})


export type WorkSpaceMembersSchema = InferSelectModel<typeof workspaceMembers>