import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { user } from './authentication.schema';
import { defaults } from './structures/base.schema';
import { org } from './organization.schema';

export const userMetadata = pgTable('user_metadata', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.references(() => user.id)
		.notNull(),
	completedOnboarding: boolean('completed_onboarding').default(false),
	hasOrganization: boolean("has_organization").default(false),
	associatedOrg: uuid("associated_org").references(() => org.id),
	...defaults('metadata')
});
