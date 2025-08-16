import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";
import { project } from "./project.schema";


export const projectMetadata = pgTable("project_metadata", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id").references(() => project.id),
    completed: boolean("completed").default(false),
    canceled: boolean("canceled").default(false)
}) 