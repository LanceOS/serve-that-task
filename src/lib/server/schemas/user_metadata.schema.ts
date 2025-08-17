import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { defaults } from './structures/base.schema';
import { user } from './authentication.schema';

export const userMetadata = pgTable('user_metadata', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.references(() => user.id)
		.notNull(),
	has_workspace: boolean("has_workspace").default(false),
	preferredTheme: text("preferred_theme").default("dim"),
	online: boolean("online").default(false),
	...defaults('metadata')
});
