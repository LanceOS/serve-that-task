import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { defaults } from './structures/base.schema';
import { team } from './team.schema';
import { user } from './authentication.schema';

export const userMetadata = pgTable('user_metadata', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.references(() => user.id)
		.notNull(),
	hasOrganization: boolean("has_organization").default(false),
	associatedOrg: uuid("associated_org").references(() => team.id),
	...defaults('metadata')
});
