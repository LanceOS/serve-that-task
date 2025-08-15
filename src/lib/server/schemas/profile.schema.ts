import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { user } from "./authentication.schema";
import { defaults } from "./structures/base.schema";


export const profile = pgTable('profile', {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").references(() => user.id),
    bio: text("bio"),
    ...defaults("profile")
})