import { InferSelectModel, sql } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { defaults } from "./structures/base.schema";
import { user } from "./authentication.schema";


export const Organization = pgTable("organization", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    timezone: text("timezone").notNull(),
    owner: text("owner").references(() => user.id).notNull(),
    ...defaults
})


export type OrganizationSchema = InferSelectModel<typeof Organization>