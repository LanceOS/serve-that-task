import type { ProfileSchema } from '$lib/server/schemas/profile.schema';
import type { OrgSchema } from '$lib/server/schemas/workspace.schema';
import type { JournalSchema } from '$lib/server/schemas/journals.schema';
import type { TaskItemSchema } from '$lib/server/schemas/task.schema';
import type { TaskGroupSchema } from '$lib/server/schemas/task_group.schema';
import type { UserSchema } from '$lib/server/schemas/authentication.schema';

export type DBTables =
	| UserSchema
	| ProfileSchema
	| OrgSchema
	| JournalSchema
	| TaskItemSchema
	| TaskGroupSchema;
