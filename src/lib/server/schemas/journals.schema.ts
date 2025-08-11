import { sql } from 'drizzle-orm';
import { boolean } from 'drizzle-orm/pg-core';
import { text } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { defaults } from './structures/base.schema';

export const Journals = pgTable('journals', {
	id: uuid('id')
		.primaryKey()
		.defaultRandom(),
	action: text('action').notNull(),
	actionSuccess: boolean('action_success').default(false).notNull(),
	description: text('description').notNull(),
	...defaults('journal')
});
