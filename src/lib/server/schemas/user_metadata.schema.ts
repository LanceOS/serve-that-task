import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { user } from './authentication.schema';
import { defaults } from './structures/base.schema';

export const userMetadata = pgTable('user_metadata', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.references(() => user.id)
		.notNull(),
	completedOnboarding: boolean('completed_onboarding').default(false),
	...defaults('metadata')
});
