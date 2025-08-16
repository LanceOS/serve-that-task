import type { UserSchema } from "$lib/server/schemas/authentication.schema";
import type { ProfileSchema } from "$lib/server/schemas/profile.schema";
import type { OrgSchema } from "$lib/server/schemas/organization.schema";
import type { JournalSchema } from "$lib/server/schemas/journals.schema";
import type { TaskItemSchema } from "$lib/server/schemas/task.schema";
import type { TaskGroupSchema } from "$lib/server/schemas/task_group.schema";


export type DBTables = 
    UserSchema |
    ProfileSchema |
    OrgSchema |
    JournalSchema |
    TaskItemSchema |
    TaskGroupSchema
