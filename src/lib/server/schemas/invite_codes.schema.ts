import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { workspace } from "./workspace.schema";
import { defaults } from "./structures/base.schema";



export const inviteCodes = pgTable("invite_codes", {
    id: uuid("id").primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id").references(() => workspace.id).notNull(),
    inviteCode: text("invite_code").notNull(),
    ...defaults("invite_codes")
})