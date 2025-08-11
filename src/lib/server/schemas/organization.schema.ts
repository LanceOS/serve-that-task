import { InferSelectModel, sql } from 'drizzle-orm';
import { text } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { defaults } from './structures/base.schema';
import { user } from './authentication.schema';

export const Org = pgTable('organization', {
	id: uuid('id')
		.primaryKey()
		.defaultRandom(),
	name: text('name').notNull(),
	timezone: text('timezone').notNull(),
	country: text('country').notNull(),
	state: text('state').notNull(),
	city: text("city").notNull(),
	postal_code: text("postal_code").notNull(),
	address: text('address').notNull(),
	ownerId: text('owner')
		.references(() => user.id)
		.notNull(),
	...defaults('org')
});

export type OrgSchema = InferSelectModel<typeof Org>;
