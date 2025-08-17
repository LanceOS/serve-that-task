import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { defaults } from "./structures/base.schema";
import type { InferSelectModel } from "drizzle-orm";
import { user } from "./authentication.schema";


export const profile = pgTable('profile', {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").references(() => user.id),
    bio: text("bio"),
    ...defaults("profile")
})

export type ProfileSchema = InferSelectModel<typeof profile>