import { timestamp } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";



export const defaults = {
    isDeleted: boolean("deleted").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
}